// auth.js
const passport = require('passport');
const { OIDCStrategy } = require('passport-openidconnect');

passport.use(
  'oidc',
  new OIDCStrategy(
    {
      issuer: 'YOUR_ISSUER_URL',
      clientID: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      redirectURL: 'http://localhost:5000/auth/callback',
      scope: 'openid profile email',
    },
    (issuer, sub, profile, accessToken, refreshToken, done) => {
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
