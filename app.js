const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('dotenv').config();
require('newrelic');

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import database connection files and models
const sequelize = require('./database/postgres'); // Assuming you're using Sequelize for PostgreSQL
const connectToMongoDB = require('./database/mongo'); // Function to connect to MongoDB
const routes = require('./routes/accountRoutes');


// Middleware
app.use(bodyParser.json());


app.use(routes); // Assuming your account-related routes are under /api

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const port = process.env.PORT || 3000;

// Connect to your databases
sequelize.authenticate().then(() => {
  console.log('Connected to PostgreSQL');
}).catch((error) => {
  console.error('Error connecting to PostgreSQL:', error);
});

connectToMongoDB(); // Connect to MongoDB
// Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });