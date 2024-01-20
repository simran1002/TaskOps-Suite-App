// routes/auth.js
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/login', (req, res) => {
  res.send('Login page'); // Replace with your login page
});

router.get(
  '/login/oidc',
  passport.authenticate('oidc', {
    successRedirect: '/dashboard', // Redirect after successful login
    failureRedirect: '/login', // Redirect after failed login
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/callback', passport.authenticate('oidc', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router;
