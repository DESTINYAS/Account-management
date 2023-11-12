const winston = require('winston');
require('winston-mongodb');

const logFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  const meta = metadata !== undefined && Object.keys(metadata).length ? JSON.stringify(metadata) : '';
  return `${timestamp} [${level.toUpperCase()}] - ${message} ${meta}`;
});

const transports = [
  new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      logFormat
    ),
  }),
  new winston.transports.File({
    filename: 'combined.log',
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), logFormat),
  }),
  new winston.transports.MongoDB({
    level: 'info',
    db: process.env.MONGODB_URI, // Replace with your MongoDB connection string
    options: { useUnifiedTopology: true },
    collection: 'logs', // Replace with your preferred collection name
    format: winston.format.combine(winston.format.timestamp(), logFormat),
  }),
];

const logger = winston.createLogger({
  transports,
});

module.exports = logger;
