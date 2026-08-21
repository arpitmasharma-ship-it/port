const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

// ==========================================
// LOGIN (admin only)
// POST /api/auth/login
// ==========================================

router.post(
    "/login",
    [
        body("email")
            .notEmpty()
            .withMessage("Email is required"),

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