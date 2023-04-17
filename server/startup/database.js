const mongoose = require("mongoose");
const debug = require("debug")("app:db");
const logger = require("./logging");

const dbURI =
  process.env.NODE_ENV === "developement"
    ? "mongodb://localhost/shoestore"
    : process.env.DB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
  logger.info(`mongoose is connected to ${dbURI}`)
);

mongoose.connection.on("error", (err) =>
  debug(`Error connecting to db ${err}`)
);

mongoose.connection.on("disconnected", () => {
  debug(`Mongoose is disconnected`);
});

process.on("SIGINT", () => {
  debug("Mongoose disconnected on exit process");
  process.exit(0);
});

module.exports = mongoose;
