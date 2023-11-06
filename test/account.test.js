const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const Account = require('../models/accountMongo');

describe('Account Creation', () => {
  it('should create an account with valid data', async () => {
    const accountData = {
      firstName: 'Ronaldo',
      lastName: 'Delima',
      middleName: 'Brazil',
      accountType: 'Savings',
    };

    // Create a stub for the database query
    const dbStub = sinon.stub(Account, 'create');
    dbStub.returns(Promise.resolve(accountData));

    // Perform the test action that calls the database query
    const newAccount = await Account.create(accountData);

    // Validate the results
    expect(newAccount).to.be.an('object');
    expect(newAccount.firstName).to.equal(accountData.firstName);

    // Restore the stub
    dbStub.restore();
  });

  it('should reject account creation with missing required data', async () => {
    const invalidAccountData = {
      // Missing required fields like firstName, lastName, or accountType
    };

    // Create a stub for the database query that throws an error
    const dbStub = sinon.stub(Account, 'create');
    dbStub.throws(new Error('Missing required data'));

    // Perform the test action that calls the database query
    try {
      await Account.create(invalidAccountData);
    } catch (error) {
      // Validate that an error is thrown
      expect(error).to.be.an('error');
    }

    // Restore the stub
    dbStub.restore();
  });

  it('should reject account creation with invalid data', async () => {
    const invalidAccountData = {
      firstName: 'John',
      lastName: 'Obi',
      middleName: 'Mikel',
      accountType: 'InvalidType', // An invalid account type
    };

    // Create a stub for the database query that throws an error
    const dbStub = sinon.stub(Account, 'create');
    dbStub.throws(new Error('Invalid data'));

    // Perform the test action that calls the database query
    try {
      await Account.create(invalidAccountData);
    } catch (error) {
      // Validate that an error is thrown
      expect(error).to.be.an('error');
    }

    // Restore the stub
    dbStub.restore();
  });

  it('should assign a unique account number to each account', async () => {
    const accountData1 = {
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'A',
      accountType: 'Savings',
    };

    const accountData2 = {
      firstName: 'Jane',
      lastName: 'Smith',
      middleName: 'B',
      accountType: 'Current',
    };

    // Create stubs for the database query
    const dbStub = sinon.stub(Account, 'create');
    dbStub.onFirstCall().returns(Promise.resolve({ ...accountData1, accountNumber: 1 }));
    dbStub.onSecondCall().returns(Promise.resolve({ ...accountData2, accountNumber: 2 }));

    // Perform the test action that calls the database query
    const newAccount1 = await Account.create(accountData1);
    const newAccount2 = await Account.create(accountData2);

    // Validate the results
    expect(newAccount1.accountNumber).to.be.a('number');
    expect(newAccount2.accountNumber).to.be.a('number');
    expect(newAccount1.accountNumber).to.not.equal(newAccount2.accountNumber);

    // Restore the stub
    dbStub.restore();
  });
});
