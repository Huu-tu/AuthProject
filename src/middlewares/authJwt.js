const Account = require('../models/accountModel');
const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
const KEY = process.env.key;

class authJwt {
  checkLogin(req, res, next) {
    try {
      // let token = req.cookies.token;
      const bearerHeader = req.headers['authorization'];
      const bearerToken = bearerHeader.split(' ')[1];
      if (!bearerToken) {
        res.json('No token here');
      } else {
        jwt.verify(`${bearerToken}`, KEY, {}, (err, decode) => {
          if (err) {
            res.json('Not Permission');
          }
          // req.someVariable = decode
          req.data = decode;
          next();
        });
      }
    } catch (error) {
      res.redirect('back');
    }
  }

  checkSession(req, res, next) {
    try {
      // let token = req.cookies.token;
      const authorization = req.headers['authorization'];
      if (authorization === req.session.huutu.sessionID) {
        next();
      } else {
        res.json('Not Permission');
      }
    } catch (error) {
      res.redirect('back');
    }
  }

  checkCurrentUser(req, res, next) {
    try {
      let token = req.cookies.token;
      let id = jwt.verify(token, KEY);
      Account.findOne({
        _id: id,
      })
        .then((data) => {
          res.locals.data = data;
          next();
        })
        .catch(() => {
          res.locals.data = null;
          next();
        });
    } catch (e) {}
  }
}

module.exports = new authJwt();
