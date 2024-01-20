// auth.js
const passport = require('passport');
const { OIDCStrategy } = require('passport-openidconnect');

passport.use(
  'oidc',
  new OIDCStrategy(
    {
      issuer:process.env.ISSUER ,
      clientID: process.env.CLIENT_ID ,
      clientSecret: process.env>CLIENT_SECRET ,
      redirectURL: process.env.REDIRECT_URL,
      scope:process.env.SCOPE ,
    },
    (issuer, sub, profile, accessToken, refreshToken, done) => {
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
