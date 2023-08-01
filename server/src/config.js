const { config } = require("dotenv");

config();

const dbConfig = {
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  server: process.env.DB_SERVER || "",
  database: process.env.DB_NAME || "",
};

const port = process.env.PORT || 3000;

module.exports = {
  dbConfig,
  port,
};
