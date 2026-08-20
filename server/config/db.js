const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Check if MongoDB URI exists
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        console.log("🔄 Connecting to MongoDB...");

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📦 Database: ${conn.connection.name}`);

    } catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);

        if (error.code) {
            console.error("Error Code:", error.code);
        }

        process.exit(1);
    }
};

module.exports = connectDB;