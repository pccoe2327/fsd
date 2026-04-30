require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedbackDB';

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ ok: true, database: 'feedbackDB' });
});

app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log(`MongoDB connected: ${MONGO_URI}`);
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
    });
