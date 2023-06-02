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

const User = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Please enter a valid email",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter a  password",
      },
    },
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: "Basic",
    allowNull: true,
  },
});

exports.createUser = (obj) =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        User.create(obj)
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

exports.allUsers = () =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        User.findAll()
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

exports.findUserById = (id) =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        User.findOne({
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

exports.deleteOneUser = (id) =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        User.destroy({
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
exports.findUserBasedOn = (obj) =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        User.findAll({
          where: {
            ...obj,
          },
        })
          .then((rep) => {
            accept(rep[0].dataValues);
          })
          .catch((error) => {
            reject(error.message);
          });
      })
      .catch((error) => {
        reject(error.message);
      });
  });
exports.updateUser = (obj) =>
  new Promise(function (accept, reject) {
    sequelize
      .sync()
      .then(() => {
        User.findOne({
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
