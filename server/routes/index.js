var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

// check if user is logged in
function isLoggedIn(req, res, next) {
  'use strict';
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

// Routes
// API Home
router.get('/', function (req, res) {
  'use strict';
  res.status(200).json({ message: 'API is working' });
});

// Profile
router.get('/profile', isLoggedIn, function (req, res) {
  'use strict';
  // Find logged User
  var userId = req.user._id;

  User.findOne({
    _id: userId
  }, function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

// Login
router.get('/login', function (req, res) {
  'use strict';
  res.json({ message: req.flash('loginMessage') });
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
  'use strict';
  res.send({ message: req.flash('signupMessage') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  //Success go to Profile Page / Fail go to Signup page
  successRedirect: '/api/profile',
  failureRedirect: '/api/signup',
  failureFlash: true
}));

// Logout
router.get('/logout', function (req, res) {
  'use strict';
  req.logout();
  res.redirect('/');
});

module.exports = router;
