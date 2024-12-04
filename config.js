require("dotenv").config();

module.exports = {
  PORT: +process.env.PORT || 3000,
  HOST: process.env.HOST || "0.0.0.0",

  NODE_ENV: process.env.NODE_ENV,
  IS_DEV_ENV: process.env.NODE_ENV === "development",

  MONGODB_DB: process.env.MONGO_DB || "gameStore",
  MONGODB_URI: process.env.APP_MONGO_DATABASE_URL || "mongodb://localhost:27017"
};