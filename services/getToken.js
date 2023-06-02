const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
let { JWT_SECRET } = process.env;
exports.getToken = (payload) =>
  new Promise(async function (accept, reject) {
    try {
      let token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 1000 * 1.2 });
      accept(token);
    } catch (error) {
      reject(error.message);
    }
  });
