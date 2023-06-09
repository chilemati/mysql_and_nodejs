const { findUserBasedOn } = require("../models/Users");
const { veriyToken } = require("../services/verifyToken");
const { currentUser } = require("./allowLogin");

exports.onlyAdmins_and_subAdmins = async (req, res, next) => {
  if (req.cookies.jwt) {
    //means a user exits
    let token = await veriyToken(req.cookies.jwt);
    // console.log("token", token);
    findUserBasedOn({ email: token })
      .then((rep) => {
        // console.log(rep[0].dataValues.role);
        if (rep.role === "Admin" || rep.role === "subAdmin") {
          currentUser.role = "Admin";
          next();
        } else {
          currentUser.role = "Basic";
          res.json({ err: `Only Admins and subAdmins can access!` });
          // res.render("Home", { user: currentUser.user });
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.json({ err: `Could not find user with that email` });
      });
  } else {
    res.json({ err: `Please Login first!` });
  }
};
