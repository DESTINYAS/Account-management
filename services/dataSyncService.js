const AccountModel = require('../models/accountPostgres');

// Function to synchronize data to PostgreSQL
const syncToPostgreSQL = async (data) => {
  try {
    const createdAccount = await AccountModel.create(data);
    console.log("Data in: "+data)
    return { success: true, message: 'Data synchronized to PostgreSQL', account: createdAccount };
  } catch (error) {
    console.log('Data synchronization error:', error);
    return { success: false, error: 'Data synchronization failed' };
  }
};

module.exports = { syncToPostgreSQL };
