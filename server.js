// =========================================================
// 1. DNS FIX FOR MONGODB ATLAS (MUST BE AT THE VERY TOP)
// =========================================================
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

// =========================================================
// 2. DEPENDENCIES & IMPORTS
// =========================================================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// =========================================================
// 3. MIDDLEWARE
// =========================================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets (CSS, JS, images, HTML) from the 'client' directory
app.use(express.static(path.join(__dirname, 'client')));

// =========================================================
// 4. API ROUTES (BACKEND)
// =========================================================
// Uncomment or adjust these lines if you have backend route files in server/routes:
// app.use('/api/auth', require('./server/routes/auth'));
// app.use('/api/users', require('./server/routes/user'));

// =========================================================
// 5. FRONTEND PAGE ROUTING
// =========================================================

// Serve main landing page index.html when visiting root URL '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Serve root level pages like /login.html or /signup.html if placed inside client/
app.get('/:page.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', `${req.params.page}.html`));
});

// Serve sub-folder pages like /pages/oils.html or /pages/take-test.html
app.get('/pages/:page', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'pages', req.params.page));
});

// =========================================================
// 6. DATABASE CONNECTION & SERVER INITIALIZATION
// =========================================================
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
  });