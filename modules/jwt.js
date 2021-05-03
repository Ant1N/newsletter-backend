const jwt = require('jsonwebtoken');
const accessTokenSecret = 'tacospafredag';

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.authorization;

  if (token) {
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.render('pages/login');
      }
      if (!user.admin) {
        return res.render('pages/login');
      }
      req.user = user;
      next();
    });
  } else {
    return res.render('pages/login');
  }
};

module.exports.authenticate = authenticateJWT;
module.exports.jwt = jwt;
module.exports.accessTokenSecret = accessTokenSecret;
