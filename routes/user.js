var express = require('express');
var user = require('../schemas/user');
var mongoose = require('mongoose');
const crypto = require('crypto');

var router = express.Router();

const userModel = mongoose.model('user', user);

router.get('/', function (req, res) {
  userModel.find({}, (err, resp) => {
    if (err) {
      console.log(err);
    }
    console.log(resp);
    res.send(resp);
  });
});

router.post('/', function (req, res) {
  let user = req.body;

  const newUser = new userModel({
    email: user.email,
    password: crypto.createHash('sha256').update(user.password).digest('hex'),
    admin: user.admin,
  });
  newUser.save((err, user) => {
    if (err) {
      if (err.code == 11000) {
        res.send({
          message: 'Mailen finns redan',
        });
      } else {
        res.send({
          message: 'Någonting gick snett!',
        });
      }
    } else {
      res.status(200).send({
        message: 'Användaren har blivit tillagd.',
        user: user,
      });
    }
  });
});

module.exports = router;
