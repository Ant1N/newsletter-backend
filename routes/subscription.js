var express = require('express');
var router = express.Router();
var user = require('../schemas/user');
var mongoose = require('mongoose');

const userModel = mongoose.model('user', user);

var router = express.Router();

router.post('/', (req, res) => {
  userModel.updateOne(
    { _id: req.body._id },
    { subscribed: req.body.subscribed },
    (err, response) => {
      if (err) {
        res.status(500).send({
          message: 'Nånting gick snett..',
        });
      } else {
        res.send(response);
      }
    }
  );
});

module.exports = router;
