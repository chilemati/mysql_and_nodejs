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
  password = await hashIt(password);
  let token = await getToken({ email, password: password });
  createCookie(res, token);
  // res.json({ status: "Created", body: { email, hPassword }, token });
  let toDb = {
    email,
    password,
  };
  createUser(toDb)
    .then((rep) => {
      res.redirect("/api/login");
    })
    .catch((err) => {
      res.json({ status: "failed", reply: err });
    });
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
  if (email && password) {
    findUserBasedOn({ email: email })
      .then(async (rep) => {
        console.log("rep", rep);
        let verified = compareIt(password, rep.password);
        if (verified) {
          let token = await getToken({ email: email });
          createCookie(res, token);
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
  // res.json({
  //   status: `I'm sorry${
  //     currentUser.user
  //       ? `${currentUser.user}. Please login as Admin to continue.`
  //       : ". Please login to continue."
  //   }`,
  // });
  res.render("Login", { user: currentUser.user });
};
exports.user_get_logout = (req, res, next) => {
  res.json({ status: "logged out!" });
};
exports.home = (req, res, next) => {
  res.render("Home");
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
