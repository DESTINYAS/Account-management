const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: String,
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  accountType: {
    type: String,
    required: true,
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
