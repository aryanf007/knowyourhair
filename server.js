require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dns = require('dns');

// Force Node to use Google DNS for MongoDB Atlas connection
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

// Database Connection
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err.message));
} else {
  console.log('⚠️ MONGO_URI missing in .env file');
}

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/tests', require('./server/routes/tests'));
app.use('/api/routines', require('./server/routes/routines'));

// Serve Frontend Static Files
app.use(express.static(path.join(__dirname, 'client')));

// Catch-all SPA Fallback (Express 5 safe)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});