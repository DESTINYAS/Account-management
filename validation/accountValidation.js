const Joi = require('joi');

const accountSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string().allow(null, ''),
  accountType: Joi.string().valid('Savings', 'Current').required(),
});

module.exports = accountSchema;
