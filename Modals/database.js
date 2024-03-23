
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("base", "admin", "password", {
  host: "localhost",
  dialect:
    "postgres" /* one of 'mysql'  postgres  'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established .");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;