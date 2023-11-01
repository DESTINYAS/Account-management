const express = require('express');
const router = express.Router();
const getAccountController = require('../controllers/getAccounts');
const postAccountController = require('../controllers/postAccounts');

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: API for managing user accounts
 */

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       description: Account creation data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               accountType:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - accountType
 *     responses:
 *       '201':
 *         description: Account created and synchronized
 *       '500':
 *         description: Server error
 */
// create account
router.post('/accounts', postAccountController.createAccountAndSync);


/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     tags: [Accounts]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 firstName: John
 *                 lastName: Doe
 *                 accountNumber: 1234567890
 *                 accountType: Savings
 */

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Get an account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Account ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               firstName: John
 *               lastName: Doe
 *               accountNumber: 1234567890
 *               accountType: Savings
 *       '404':
 *         description: Account not found
 */

// Route to get all accounts
router.get('/accounts', getAccountController.getAllAccounts);

// Route to get an account by ID
router.get('/accounts/:id', getAccountController.getAccountById);

module.exports = router;
