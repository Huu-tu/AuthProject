const express = require('express');
const path = require('path');
const session = require('express-session');
const filestore = require('session-file-store')(session);
const URL = process.env.url;
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 4000;
const route = require('./routes');
const db = require('./config/index');

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
// app.use(cors());

const sessionDB = new MongoStore({
  mongooseConnection: mongoose.connection,
  ttl: 14 * 24 * 60 * 60,
  autoRemove: 'native',
  // crypto: {
  //     secret: 'secretcode'
  // }
});

app.use(
  session({
    name: 'session-id',
    secret: 'secretcode', // Secret key,
    saveUninitialized: true,
    // cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: true,
    store: sessionDB,

    // genid: function(req) {
    //     return genuuid() // use UUIDs for session IDs
    //   },
  }),
);

db.connect();
route(app);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:4000`);
});
