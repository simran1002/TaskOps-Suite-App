// routes/dashboard.js
const express = require('express');
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.send('Dashboard');
});

module.exports = router;
