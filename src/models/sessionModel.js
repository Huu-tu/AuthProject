const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'sessions',
    timestamp: true,
  },
);

module.exports = mongoose.model('Session', AccountSchema);
