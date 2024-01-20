// routes/dashboard.js
const express = require('express');
const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.send('Dashboard'); // Replace with your dashboard content
});

module.exports = router;
