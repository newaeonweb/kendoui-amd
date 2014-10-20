var express = require('express');
var router = express.Router();

var Widget = require('../models/widget');

/* GET all widgets. */
router.get('/', function(req, res) {
  'use strict';
  //res.json({ message: 'Hello SPA, the API is working!' });
  Widget.find(function (err, widgets) {
    if (err) {
      res.send(err);
    }
    res.json(widgets);
  });

});

/* GET specific widgets by id. */
router.get('/:widget_id', function (req, res) {
  'use strict';

  Widget.findById(req.params.widget_id, function (err, widget) {
    if (err) {
      res.send(err);
    }
    res.json(widget);
  });

});

/* PUT widgets */
router.post('/', function(req, res) {
  'use strict';

  // create a new instance of the Widget model
  var widget = new Widget();

  // set the widgets properties (comes from the request)
  widget.username = req.body.username;
  widget.firstName = req.body.firstName;
  widget.lastName = req.body.lastName;
  widget.email = req.body.email;

  // save the data received
  widget.save(function (err) {
    if (err) {
      res.send(err);
    }
    console.log(widget);
    // give some success message
    res.json({ message: 'Widget successfully created!' });
  });

});

/* UPDATE specific widgets by id. */
router.put('/:widget_id', function (req, res) {
  'use strict';

  Widget.findById(req.params.widget_id, function (err, widget) {

    if (err) {
      res.send(err);
    }
    // set the widgets properties (comes from the request)
    widget.username = req.body.username;
    widget.firstName = req.body.firstName;
    widget.lastName = req.body.lastName;
    widget.email = req.body.email;

    // Yes, it's a valid ObjectId, proceed with `findById` call.

      // save the data received
    widget.save(function (err) {
        if (err) {
          res.send(err);
        }
      console.log(widget);
        // give some success message
      res.json({ message: 'Widget successfully updated!' });
      });

  });

});

/* DELETE specific widgets by id. */
router.delete('/:widget_id', function (req, res) {
  'use strict';

  Widget.remove({
    _id: req.params.widget_id
  }, function (err, widget) {
    if (err) {
      res.send(err);
      res.send(widget);
    }

    // give some success message
    res.json({ message: 'Widget successfully deleted!' });
  });

});

// Exports all the routes to router variable
module.exports = router;
