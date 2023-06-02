const bcrypt = require("bcrypt");
exports.compareIt = (text, hashed) =>
  new Promise(function (accept, reject) {
    bcrypt.compare(text, hashed, function (err, result) {
      // result == true
      if (err) {
        reject(false);
      } else {
        accept(true);
      }
    });
  });
