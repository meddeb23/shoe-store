const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "server/logfile.log" }),
  ],
});

process.on("uncaughtException", (ex) => {
  logger.error(ex.message, ex);
  // process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  throw ex;
});

module.exports = logger;
