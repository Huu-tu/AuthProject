const express = require('express');
const router = express.Router();
// const { register, index } = require('../controllers/accountController');
const {
  index,
  register,
  login,
  updateAccout,
  token,
  logout,
} = require('../controllers/AccountController');
const AuthJwt = require('../middlewares/authJwt');

router.get('/', index);
router.post('/api/v1/register', register);
router.post('/api/v1/dsad', register);
router.post('/api/v1/dđ', register);
router.post('/api/v1/login', login);
router.post('/api/v1/dsads', login);
router.put('/api/v1/update', [AuthJwt.checkLogin], updateAccout);
router.get('/api/v1/token', [AuthJwt.checkLogin], token);
router.get('/api/v1/logout', logout);

module.exports = router;
