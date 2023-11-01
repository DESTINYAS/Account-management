const Account = require('../models/accountMongo');
const { syncToPostgreSQL } = require('../services/dataSyncService');
const accountValidation = require('../validation/accountValidation');
const {generateUniqueAccountNumber} = require('../services/generateAccountNumber')
const {getExistingAccountNumbers} = require('../services/generateAccountNumber')

const createAccountAndSync = async (req, res) => {
  console.log("In")
  try {
    const { firstName,lastName,middleName,accountType } = req.body;
    console.log("Request : "+firstName + " "+accountType)

    // Validate the incoming data against the account schema
    const { error } = accountValidation.validate(req.body);
    console.log("error: "+error)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }   

    const existingAccountNumbers = await getExistingAccountNumbers();
     // Generate a unique 10-digit account number
    const accountNumber = generateUniqueAccountNumber(existingAccountNumbers);
    console.log("Account: "+accountNumber)
    // Create the account in MongoDB with the generated account number
    const newAccountMongo = new Account({ firstName, lastName, middleName, accountNumber, accountType });
    const savedAccountMongo = await newAccountMongo.save();

    const postgresData = {
      firstName: savedAccountMongo.firstName,
      lastName: savedAccountMongo.lastName,
      middleName: savedAccountMongo.middleName,
      accountNumber: savedAccountMongo.accountNumber,
      accountType: savedAccountMongo.accountType,
    };
    
    // Synchronize data to PostgreSQL
    const syncedAccountPostgreSQL = await syncToPostgreSQL(postgresData);

    res.json({ account: syncedAccountPostgreSQL, accountNumber });
  } catch (error) {
    res.status(500).json({ error: 'Could not create the account or synchronize data' });
  }
};


module.exports = {
  createAccountAndSync
  };
