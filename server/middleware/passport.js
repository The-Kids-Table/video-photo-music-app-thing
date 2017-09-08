'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../../db/models/user');
const bCrypt = require('bcryptjs');

let config = {
  Google: {
    clientID: process.env.GoogleClientID,
    clientSecret: process.env.GoogleClientSecret,
    callbackURL: process.env.GoogleCallbackURL
  }
};
if (!(config.Google.clientID && config.Google.clientSecret && config.Google.callbackURL)) {
  config = require('./oAuthConfig.json');
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return User.getById(id)
    .then((user) => {
      if (!user) {
        throw user;
      }
      done(null, user);
    })
    .error(error => {
      done(error, null);
    })
    .catch(() => {
      done(null, null, { message: 'No user found' });
    });
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
(req, username, password, done) => {
  return User.getByUsername(username)
    .then((user) => {
      return done(null, false, {
        message: 'Username is already taken'
      });
    })
    .catch(() => {
      let generateHash = (password) => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      let data = {
        username,
        password: generateHash(password),
        firstname: req.body.firstname,
        lastname: req.body.lastname
      };
      User.create(data)
        .then((newUser) => {
          if (!newUser) {
            return done(null, false);
          } else {
            return done(null, newUser);
          }
        })
        .catch((err) => {
          return done(null, false, {
            message: 'Username is invalid'
          });
        });
    });
}));

passport.use('local-login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
(req, username, password, done) => {
  User.getByUsername(username)
    .then((user) => {
      let isValidPassword = (userpass, password) => {
        return bCrypt.compareSync(password, userpass);
      };
      if (!user || !isValidPassword(user.password, password)) {
        return done(null, false, {
          message: 'Incorrect username or password'
        });
      }
      return done(null, user.get());
    })
    .catch((err) => {
      return done(null, false, {
        message: 'Incorrect username or password'
      });
    });
}));

passport.use('google', new GoogleStrategy({
  clientID: config.Google.clientID,
  clientSecret: config.Google.clientSecret,
  callbackURL: config.Google.callbackURL
},
  (accessToken, refreshToken, profile, done) => getOrCreateOAuthProfile('google', profile, done))
);

// passport.use('facebook', new FacebookStrategy({
//   clientID: config.Facebook.clientID,
//   clientSecret: config.Facebook.clientSecret,
//   callbackURL: config.Facebook.callbackURL,
//   profileFields: ['id', 'emails', 'name']
// },
//   (accessToken, refreshToken, profile, done) => getOrCreateOAuthProfile('facebook', profile, done))
// );

// // REQUIRES PERMISSIONS FROM TWITTER TO OBTAIN USER EMAIL ADDRESSES
// passport.use('twitter', new TwitterStrategy({
//   consumerKey: config.Twitter.consumerKey,
//   consumerSecret: config.Twitter.consumerSecret,
//   callbackURL: config.Twitter.callbackURL,
//   userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
// },
//   (accessToken, refreshToken, profile, done) => getOrCreateOAuthProfile('twitter', profile, done))
// );

const getOrCreateOAuthProfile = (oAuthProvider, oAuthProfile, done) => {
  return User.getByOAuthId(oAuthProfile.id, oAuthProvider)
    .then((user) => {
      done(null, user);
    })
    .catch(() => {
      let data = {
        oAuthUserId: oAuthProfile.id,
        oAuthProvider
      };
      User.create(data)
        .then((newUser) => {
          return done(null, newUser);
        })
        .catch(() => {
          return done(null, false, {
            message: 'An error has occured during oAuth sign in'
          });
        });
    });
};

module.exports = passport;