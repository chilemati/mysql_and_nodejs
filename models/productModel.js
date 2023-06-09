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

const Book = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  prodName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prodPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prodDetails: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prodSnippet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prodLikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
});

exports.createProduct = (obj) =>
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

exports.allProducts = () =>
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

exports.findProductById = (id) =>
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

exports.deleteOneProduct = (id) =>
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
exports.findProductBasedOn = (obj) =>
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
exports.updateProduct = (obj) =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        Book.findOne({
          where: {
            id: obj.id,
          },
        })
          .then(async (rep) => {
            rep = Object.assign(rep, obj);

            accept(await rep.save());
          })
          .catch((error) => {
            reject(error.message);
          });
      })
      .catch((error) => {
        reject(error.message);
      });
  });
exports.updateLikes = (obj) =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        Book.increment(
          { prodLikes: 1 },
          {
            where: {
              id: obj.id,
            },
          }
        )
          .then(async (rep) => {
            rep = Object.assign(rep, obj);

            accept(await rep.save());
          })
          .catch((error) => {
            reject(error.message);
          });
      })
      .catch((error) => {
        reject(error.message);
      });
  });
