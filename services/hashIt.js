const bcrypt = require("bcrypt");
const saltRounds = 13;
exports.hashIt = (text) =>
  new Promise(function (accept, reject) {
    bcrypt.hash(text, saltRounds, function (err, hash) {
      if (err) {
        reject(err.message);
      } else {
        accept(hash);
      }
    });
  });
