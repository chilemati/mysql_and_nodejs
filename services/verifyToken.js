const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
let { JWT_SECRET } = process.env;

exports.veriyToken = (check) =>
  new Promise(function (accept, reject) {
    jwt.verify(check, JWT_SECRET, function (err, decoded) {
      if (err) {
        reject(err.message);
      } else {
        accept(decoded.email);
      }
    });
    // console.log(`check: `, check);
    // accept(true);
  });
