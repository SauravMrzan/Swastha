const dotenv = require("dotenv");

const { Sequelize } = require("sequelize");
dotenv.config();
const sequelize = new Sequelize("swastha", "postgres", "S@ur@v123", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("DB connection successful............................");
  } catch (error) {
    console.error("Unable to connect to the database...............", error);
  }
}

module.exports = { sequelize, testConnection };
