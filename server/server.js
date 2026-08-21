const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// ===============================
// LOAD ENVIRONMENT VARIABLES
// ===============================
dotenv.config();

// ===============================
// DATABASE
// ===============================
const connectDB = require("./config/db");

// ===============================
// ADMIN AUTO-SEED
// ===============================
const User = require("./models/User");

const ensureAdmin = async () => {
    const email = (process.env.ADMIN_EMAIL || "arpit.admin").toLowerCase();
    const password = process.env.ADMIN_PASSWORD || "OyEXIRTrONEl";

    const existing = await User.findOne({ email });

    if (!existing) {
        // Only this admin may exist
        await User.deleteMany({});
        await User.create({ name: "Arpit Sharma", email, password });
        console.log("👑 Admin account created");
    }
};

// ===============================
// ROUTES
// ===============================
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const educationRoutes = require("./routes/education");
const experienceRoutes = require("./routes/experience");
const messagesRoutes = require("./routes/messages");
const profileRoutes = require("./routes/profile");
const projectsRoutes = require("./routes/projects");
const skillsRoutes = require("./routes/skills");
const testimonialsRoutes = require("./routes/testimonials");

// ===============================
// CREATE EXPRESS APP
// ===============================
const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Portfolio Server is running 🚀",
    });
});

// ===============================
// API ROUTES
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/testimonials", testimonialsRoutes);

// ===============================
// 404 HANDLER
// ===============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

// ===============================
// ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        console.log(
            "🔐 MONGODB_URI loaded:",
            !!process.env.MONGODB_URI
        );

        // Connect MongoDB first
        await connectDB();

        // Ensure the single admin account exists
        await ensureAdmin();

        // Start Express server only after MongoDB connection
        app.listen(PORT, () => {
            console.log("=================================");
            console.log("🚀 Portfolio Server Started");
            console.log(`📡 Port: ${PORT}`);
            console.log(`🌐 http://localhost:${PORT}`);
            console.log("🗄️ MongoDB Connected Successfully");
            console.log("=================================");
        });

    } catch (error) {
        console.error(
            "❌ Failed to start server:",
            error.message
        );

        process.exit(1);
    }
};

// Start application
startServer();