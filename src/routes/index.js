const account = require('./userRoute');

function route(app) {
  app.use('/', account);
}

module.exports = route;
