const Account = require('../models/accountMongo');

async function getExistingAccountNumbers() {
  try {
    const existingAccounts = await Account.find({}, 'accountNumber');
    console.log("ex: " + existingAccounts);
    const existingAccountNumbers = existingAccounts.map(account => account.accountNumber);
    console.log("existing: " + existingAccountNumbers);
    return existingAccountNumbers;
  } catch (error) {
    console.log('Error fetching existing account numbers:', error);
    return [];
  }
}

function generateUniqueAccountNumber(existingAccountNumbers) {
  console.log("function: " + existingAccountNumbers);
  const min = 1000000000; // Minimum 10-digit number
  const max = 9999999999; // Maximum 10-digit number

  let accountNumber;
  do {
    accountNumber = Math.floor(min + Math.random() * (max - min + 1));
  } while (existingAccountNumbers.includes(accountNumber));
  console.log("generated: " + accountNumber);
  return accountNumber;
}

module.exports = {
  getExistingAccountNumbers,
  generateUniqueAccountNumber,
};
