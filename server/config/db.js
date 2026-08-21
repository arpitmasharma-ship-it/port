const mongoose = require("mongoose");
const dns = require("dns");

// Force Node.js to use Google DNS for MongoDB SRV lookup
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async (retries = 5, delay = 5000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            if (!process.env.MONGODB_URI) {
                throw new Error(
                    "MONGODB_URI is not defined in environment variables"
                );
            }

            console.log(
                `🔄 Connecting to MongoDB... (attempt ${attempt}/${retries})`
            );

            const conn = await mongoose.connect(
                process.env.MONGODB_URI,
                {
                    serverSelectionTimeoutMS: 30000,
                    connectTimeoutMS: 30000,
                }
            );

            console.log("=================================");
            console.log("✅ MongoDB Connected Successfully");
            console.log(`🖥️ Host: ${conn.connection.host}`);
            console.log(`📦 Database: ${conn.connection.name}`);
            console.log("=================================");

            return conn;

        } catch (error) {
            console.error(
                `❌ Attempt ${attempt}/${retries} failed`
            );

            console.error("Error Message:", error.message);

            if (attempt === retries) {
                console.error(
                    "❌ All MongoDB connection attempts failed."
                );

                throw error;
            }

            console.log(
                `⏳ Retrying in ${delay / 1000}s...`
            );

            await new Promise((resolve) =>
                setTimeout(resolve, delay)
            );
        }
    }
};

module.exports = connectDB;