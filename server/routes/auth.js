const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

// ==========================================
// REGISTER
// POST /api/auth/register
// ==========================================

router.post(
    "/register",
    [
        body("name")
            .notEmpty()
            .withMessage("Name is required"),

        body("email")
            .isEmail()
            .withMessage("Please include a valid email"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        try {
            // Only one admin/user allowed
            const userCount = await User.countDocuments();

            if (userCount > 0) {
                return res.status(403).json({
                    success: false,
                    message: "Admin already exists. Only one admin allowed.",
                });
            }

            const { name, email, password } = req.body;

            const user = await User.create({
                name,
                email,
                password,
            });

            const token = user.getSignedJwtToken();

            res.status(201).json({
                success: true,
                token,
            });

        } catch (err) {
            console.error("REGISTER ERROR:", err);

            res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    }
);

// ==========================================
// CHECK ADMIN EXISTS
// GET /api/auth/admin-exists
// ==========================================

router.get("/admin-exists", async (req, res) => {
    try {
        const count = await User.countDocuments();

        res.json({
            success: true,
            exists: count > 0,
        });

    } catch (err) {
        console.error("ADMIN EXISTS ERROR:", err);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

// ==========================================
// LOGIN
// POST /api/auth/login
// ==========================================

router.post(
    "/login",
    [
        body("email")
            .isEmail()
            .withMessage("Please include a valid email"),

        body("password")
            .exists()
            .withMessage("Password is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            const isMatch = await user.matchPassword(password);

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            const token = user.getSignedJwtToken();

            res.json({
                success: true,
                token,
            });

        } catch (err) {
            console.error("LOGIN ERROR:", err);

            res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    }
);

// ==========================================
// GET CURRENT USER
// GET /api/auth/me
// ==========================================

router.get("/me", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.json({
            success: true,
            data: user,
        });

    } catch (err) {
        console.error("GET ME ERROR:", err);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

module.exports = router;