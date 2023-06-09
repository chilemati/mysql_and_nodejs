const { currentUser } = require("../middlewares/allowLogin");
const {
  createUser,
  allUsers,
  findUserById,
  deleteOneUser,
  findUserBasedOn,
  updateUser,
} = require("../models/Users");
const { compareIt } = require("../services/compareIt");
const { createCookie } = require("../services/createCookie");
const { getToken } = require("../services/getToken");
const { hashIt } = require("../services/hashIt");

exports.user_create = async (req, res, next) => {
  let { email, password } = req.body;
  if (password && email) {
    password = await hashIt(password);
    let token = await getToken({ email, password: password });
    createCookie(res, token, 5.2);
    // res.json({ status: "Created", body: { email, hPassword }, token });
    let toDb = {
      email,
      password,
    };
    createUser(toDb)
      .then((rep) => {
        // res.redirect("/api/login");
        res.json({ status: "New user Crated!" });
      })
      .catch((err) => {
        res.json({
          err: err.includes("Validation error")
            ? "User already Exists!!!"
            : err.message,
        });
      });
  } else {
    res.json({ err: "Provide login Details" });
  }
};

exports.user_get_all = (req, res, next) => {
  allUsers()
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
exports.user_post_login = async (req, res, next) => {
  let { email, password } = req.body;
  // console.log(req.body);
  if (email && password) {
    findUserBasedOn({ email: email })
      .then(async (rep) => {
        // console.log("rep", rep);
        let verified = await compareIt(password, rep.password);
        console.log(verified);
        if (verified) {
          let token = await getToken({ email: email });
          createCookie(res, token, 5.2);
          res.json({ status: "access granted!" });
        } else {
          res.json({ err: "wrong  passord" });
        }
      })
      .catch((err) => {
        res.json({ err: "wrong email" });
      });
  } else {
    res.json({ err: "Please provide login Details" });
  }
};
exports.user_get_login = async (req, res, next) => {
  res.render("Login", { user: "" });
};
exports.user_get_signup = async (req, res, next) => {
  res.render("Signup", { user: "" });
};
exports.user_get_logout = (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });
  currentUser.user = "";
  res.render("Home", { user: currentUser.user });
};
exports.home = (req, res, next) => {
  res.render("Home", { user: currentUser.user });
};
exports.user_post_single = async (req, res, next) => {
  let { id } = req.body;
  findUserById(id)
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
exports.user_delete_single = async (req, res, next) => {
  let { id } = req.body;
  deleteOneUser(id)
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
exports.user_post_findMany = async (req, res, next) => {
  let obj = req.body;
  // res.json(obj);
  findUserBasedOn(obj)
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
exports.user_post_update = async (req, res, next) => {
  let obj = req.body;
  // res.json(obj);
  updateUser(obj)
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
