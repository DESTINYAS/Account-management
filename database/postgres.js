const { Sequelize } = require('sequelize');

// Define the database connection parameters
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host:process.env.DATABASE_HOST,
      dialect: 'postgres',
      logging: (query) => {
        console.log(query);
      },
    }
  );

module.exports = sequelize;
