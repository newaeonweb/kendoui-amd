var express = require('express');
var router = express.Router();

var Speaker = require('../models/speaker');

/* GET all speakers. */
router.get('/', function (req, res) {
  'use strict';
  //res.json({ message: 'Hello SPA, the API is working!' });
  Speaker.find(function (err, speakers) {
    if (err) {
      res.send(err);
    }
    res.json(speakers);
  });

});

/* GET specific users by id. */
router.get('/:speaker_id', function (req, res) {
  'use strict';

  Speaker.findById(req.params.speaker_id, function (err, speaker) {
    if (err) {
      res.send(err);
    }
    res.json(speaker);
  });
});

/* PUT users */
router.post('/', function (req, res) {
  'use strict';
  // create a new instance of the Speaker model
  var speaker = new Speaker();

  // set the speakers properties (comes from the request)
  speaker.name = req.body.name;
  speaker.company = req.body.company;
  speaker.title = req.body.title;
  speaker.description = req.body.description;
  speaker.picture = req.body.picture;
  speaker.schedule = req.body.schedule;

  // save the data received
  speaker.save(function (err) {
    if (err) {
      res.send(err);
    }
    // give some success message
    res.json({ message: 'speaker successfully created!' });
  });

});

/* UPDATE specific users by id. */
router.put('/:speaker_id', function (req, res) {
  'use strict';

  Speaker.findById(req.params.speaker_id, function (err, speaker) {

    if (err) {
      res.send(err);
    }
    // set the speakers properties (comes from the request)
    speaker.name = req.body.name;
    speaker.company = req.body.company;
    speaker.title = req.body.title;
    speaker.description = req.body.description;
    speaker.picture = req.body.picture;
    speaker.schedule = req.body.schedule;

    // save the data received
    speaker.save(function (err) {
      if (err) {
        res.send(err);
      }
      // give some success message
      res.json({ message: 'speaker successfully updated!' });
    });

  });

});

/* DELETE specific users by id. */
router.delete('/:speaker_id', function (req, res) {
  'use strict';

  Speaker.remove({
    _id: req.params.speaker_id
  }, function (err, speaker) {
    if (err) {
      res.send(err);
      res.send(speaker);
    }
    // give some success message
    res.json({ message: 'speaker successfully deleted!' });
  });
});

// Exports all the routes to router variable
module.exports = router;
