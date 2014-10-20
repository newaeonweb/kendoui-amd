var express = require('express');
var router = express.Router();

var User = require('../models/user');

var passport = require('passport');

// Home
router.get('/', function(req, res) {
  res.status(200).json({ message: 'API is working' })
});

// Profile
router.get('/profile', isLoggedIn, function (req, res) {
  // Find logged User
  User.findOne({ email: res.email }, function (err, user) {

    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

// Logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Login
router.get('/login', function (req, res) {
  res.send({ message: req.flash('loginMessage') });
});

// Login Post
router.post('/login', passport.authenticate('local-login', {
  //Success go to Profile Page / Fail go to login page
  successRedirect: '/api/profile',
  failureRedirect: '/api/login',
  failureFlash: true
}));

// Sign up
router.get('/signup', function (req, res) {
  res.send({ message: req.flash('signupMessage') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  //Success go to Profile Page / Fail go to Signup page
  successRedirect: '/api/profile',
  failureRedirect: '/api/signup',
  failureFlash: true
}));


// check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

module.exports = router;
