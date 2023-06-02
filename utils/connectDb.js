const Sequelize = require("sequelize");
const dotenv = require("dotenv").config();
let { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } = process.env;
const connectDb = (cb) => {
  const sequelize = new Sequelize(
    "hello_world_db",
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    {
      host: DATABASE_HOST,
      dialect: "mysql",
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      cb();
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error.message);
    });
};

module.exports = connectDb;
