const Sequelize = require('sequelize');
const sequelize = require('../database/postgres');

const AccountModel = sequelize.define('Account', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  middleName: Sequelize.STRING,
  accountNumber: {
    type: Sequelize.BIGINT,
    unique: true,
  },
  accountType: Sequelize.STRING,
});

module.exports = AccountModel;