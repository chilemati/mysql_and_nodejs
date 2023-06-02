const { Sequelize, Model, DataTypes } = require("sequelize");
const dotenv = require("dotenv").config();
let { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } = process.env;

const sequelize = new Sequelize(
  "hello_world_db",
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: "mysql",
  }
);

const Book = sequelize.define("books", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATEONLY,
  },
  subject: {
    type: DataTypes.INTEGER,
  },
});

exports.createBook = (obj) =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        Book.create(obj)
          .then((res) => {
            accept(res);
          })
          .catch((error) => {
            reject(error.message);
          });
      })
      .catch((error) => {
        reject(error.message);
      });
  });

exports.allBooks = () =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        Book.findAll()
          .then((rep) => {
            accept(rep);
          })
          .catch((err) => {
            reject(err.message);
          });
      })
      .catch((err) => {
        reject(err.message);
      });
  });

exports.findById = (id) =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        Book.findOne({
          where: {
            id: String(id),
          },
        })
          .then((rep) => {
            accept(rep);
          })
          .catch((error) => {
            reject(error.message);
          });
      })
      .catch((error) => {
        reject(error.message);
      });
  });

exports.deleteOne = (id) =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        Book.destroy({
          where: {
            id: id,
          },
        })
          .then((rep) => {
            accept(rep);
          })
          .catch((error) => {
            reject(error.message);
          });
      })
      .catch((error) => {
        reject(error.message);
      });
  });
exports.findBaseOn = (obj) =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        Book.findAll({
          where: {
            ...obj,
          },
        })
          .then((rep) => {
            accept(rep);
          })
          .catch((error) => {
            reject(error.message);
          });
      })
      .catch((error) => {
        reject(error.message);
      });
  });
