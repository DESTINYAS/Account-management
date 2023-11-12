const logger = require('../winston-config');
const Account = require('../models/accountMongo');

// Get all accounts
const getAllAccounts = async (req, res,next) => {
  logger.info('Received request to get all accounts', { timestamp: new Date() });
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    logger.error('Error fetching accounts:', { error: error.message, timestamp: new Date() });
    next(error)
  }
};

// Get an account by ID
const getAccountById = async (req, res,next) => {
  logger.info('Received request to get account by ID:', { timestamp: new Date() });

  const accountId = req.params.id;

  try {
    const account = await Account.findById(accountId);

    if (account) {
      res.json(account);
    } else {
      logger.warn('Account not found for ID:', { accountId, timestamp: new Date() });
      res.status(404).json({ error: 'Account not found' });
    }
  } catch (error) {
    logger.error('Error fetching account by ID:', { error: error.message, timestamp: new Date() });
    next(error)
  }
};

module.exports = {
  getAllAccounts,
  getAccountById,
};
