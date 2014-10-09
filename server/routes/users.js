var express = require('express');
var router = express.Router();

var User     = require('../models/user');

/* GET all users. */
router.get('/', function(req, res) {
  //res.json({ message: 'Hello SPA, the API is working!' });
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });

});

/* GET specific users by id. */
router.get('/:user_id', function(req, res) {

  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });

});

/* PUT users */
router.post('/', function(req, res) {
  // create a new instance of the User model
  var user = new User();

  // set the users properties (comes from the request)
  user.username = req.body.username;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;

  // save the data received
  user.save(function(err) {
    if (err)
      res.send(err);
    console.log(user);
    // give some success message
    res.json({ message: 'user successfully created!' });
  });

});

/* UPDATE specific users by id. */
router.put('/:user_id', function(req, res) {

  User.findById(req.params.user_id, function(err, user) {

    if (err)
      res.send(err);

    // set the users properties (comes from the request)
    user.username = req.body.username;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;


      // Yes, it's a valid ObjectId, proceed with `findById` call.

      // save the data received
      user.save(function (err) {
        if (err)
          res.send(err);
        console.log(user);
        // give some success message
        res.json({ message: 'user successfully updated!' });
      });

  });

});

/* DELETE specific users by id. */
router.delete('/:user_id', function(req, res) {

  User.remove({
    _id: req.params.user_id
  }, function(err, user) {
    if (err)
      res.send(err);

    // give some success message
    res.json({ message: 'user successfully deleted!' });
  });

});

// Exports all the routes to router variable
module.exports = router;
