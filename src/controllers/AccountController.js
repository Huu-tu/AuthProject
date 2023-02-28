const Account = require('../models/accountModel');
const Session = require('../models/sessionModel');
const jwt = require('jsonwebtoken');
const KEY = process.env.key;

//[GET]
exports.index = (req, res) => {};

//[POST] Register User
exports.register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const fullName = req.body.fullName;
  const role = req.body.role;

  let user = await Account.findOne({
    username,
  });
  if (user) {
    return res.json({
      status: 400,
      data: {
        message: 'User da ton tai',
      },
    });
  } else {
    await Account.create({
      username: username,
      password: password,
      fullName: fullName,
      role: role,
    });

    return res.json({
      status: 201,
      data: {
        message: 'Success',
      },
    });
  }
};

//[POST] login user
exports.login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  const user = await Account.findOne({
    username: username,
    password: password,
  });

  if (user) {
    let token = jwt.sign(
      {
        _id: user._id,
      },
      KEY,
    );

    req.session.user = user;

    return res.json({
      status: 200,
      data: {
        message: 'Login success',
        token: token,
      },
    });
  } else {
    return res.json({
      status: 401,
      data: {
        message: 'Dont Success',
      },
    });
  }
};

//[GET] Check authenication
exports.token = (req, res) => {
  const authorization = req.headers['authorization'];
  const session = Session.findOne({
    sessionId: authorization,
  });

  if (session) {
    return res.json({
      status: 200,
      data: {
        message: `Success`,
      },
    });
  } else {
    return res.json({
      status: 401,
      data: {
        message: 'Dont Success',
      },
    });
  }
};

//[PUT] Update User
exports.updateAccout = async (req, res) => {
  let _id = req.data._id;
  let password = req.body.password;
  let fullName = req.body.fullName;
  const authorization = req.headers['Auth'];
  await Session.findOne({
    _id: authorization,
  })
    .then(async () => {
      await Account.findOneAndUpdate(
        { _id: _id },
        {
          password: password,
          fullName: fullName,
        },
      );
      return res.json({
        status: 200,
        data: {
          message: `Success`,
        },
      });
    })
    .catch((err) => {
      return res.json({
        status: 401,
        data: {
          message: 'Dont Success',
        },
      });
    });
};

//[GET] Logout User
exports.logout = async (req, res) => {
  const bearerHeader = req.headers['authorization'];
  const bearerToken = bearerHeader.split(' ')[1];

  if (!bearerToken) {
    return res.json({
      status: 401,
      data: {
        message: 'Dont Success',
      },
    });
  } else {
    jwt.destroy(bearerToken, KEY);
    req.session.user.destroy();
    return res.json({
      status: 200,
      data: {
        message: `Success`,
      },
    });
  }
};
