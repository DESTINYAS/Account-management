const Account = require('../models/accountMongo');

// Get all accounts
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Failed to retrieve accounts' });
  }
};

// Get an account by ID
const getAccountById = async (req, res) => {
  const accountId = req.params.id;

  try {
    const account = await Account.findById(accountId);

    if (account) {
      res.json(account);
    } else {
      res.status(404).json({ error: 'Account not found' });
    }
  } catch (error) {
    console.error('Error fetching account by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve account' });
  }
};

module.exports = {
  getAllAccounts,
  getAccountById,
};
