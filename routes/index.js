var express = require('express');
var router = express.Router();
var user = require('../schemas/user');
var mongoose = require('mongoose');

const path = require('path');
const crypto = require('crypto');
const { authenticate, jwt, accessTokenSecret } = require('../modules/jwt');
const userModel = mongoose.model('user', user);

router.get('/', authenticate, (req, res, next) => {
  userModel.find({}, (err, resp) => {
    if (err) {
      console.log(err);
    }
    res.render('pages/index', { users: resp });
    console.log(resp);
  });
});

router.post('/login', (req, res) => {
  let request = req.body;
  let user = userModel.where({ email: request.email });
  let password = crypto
    .createHash('sha256')
    .update(request.password)
    .digest('hex');
  user.findOne((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
    } else {
      if (user.password == password) {
        const accessToken = jwt.sign(
          {
            _id: user._id,
            admin: user.admin,
          },
          accessTokenSecret
        );

        res.status(200).send({
          message: 'Du är inloggad.',
          user: user,
          accessToken: accessToken,
          status: 200,
        });
      } else if (user.password != password) {
        res.status(403).send({
          message: 'Kunde inte hitta användaren',
        });
      } else {
        res.status(403).send({
          message: 'Fel lösenord',
        });
      }
    }
  });
});

// router.get('/logout', (req, res) => {
//   console.log(req);
//   req.cookies.set('testtoken', { expires: Date.now() });
// });

module.exports = router;
