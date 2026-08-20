const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

// Connect MongoDB
connectDB();

const app = express();


// ===============================
// CORS
// ===============================

app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'http://localhost:3000',
            process.env.CLIENT_URL
        ].filter(Boolean),

        credentials: true
    })
);


// ===============================
// BODY PARSERS
// ===============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ===============================
// STATIC UPLOADS
// ===============================

app.use('/uploads', express.static('uploads'));


// ===============================
// API ROUTES
// ===============================

app.use('/api/auth', require('./routes/auth'));

app.use('/api/profile', require('./routes/profile'));

app.use('/api/skills', require('./routes/skills'));

app.use('/api/projects', require('./routes/projects'));

app.use('/api/experience', require('./routes/experience'));

app.use('/api/education', require('./routes/education'));

app.use('/api/testimonials', require('./routes/testimonials'));

app.use('/api/blog', require('./routes/blog'));

app.use('/api/messages', require('./routes/messages'));


// ===============================
// HEALTH CHECK
// ===============================

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Portfolio API is running 🚀'
    });
});


// ===============================
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
    console.error('Server Error:', err);

    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});


// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});