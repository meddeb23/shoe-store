require("dotenv").config();
const debug = require("debug")("app:startup");
const express = require("express");

const app = express();

require("./startup/logging");
require("./startup/routes")(app);
require("./startup/database"); // Connnect to a database
require("./startup/config")();

// const dev = process.env.NODE_ENV === "development";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  debug(`server running on port ${PORT} on ${process.env.NODE_ENV} mode`)
);
