const { veriyToken } = require("../services/verifyToken");

exports.allowLogin = async (req, res, next) => {
  if (req.cookies.jwt) {
    //verify token

    let token = await veriyToken(req.cookies.jwt);
    this.currentUser.user = token;
    res.locals.isLoggedIn = "true";
    next();
  } else {
    this.currentUser.user = "";
    // res.json({ err: "Please Login" });
    this.previousPath.path = req.path;
    res.locals.isLoggedIn = "false";
    res.redirect("loginGet");
  }
};

exports.currentUser = {
  user: "",
  role: "Basic",
};

exports.previousPath = {
  path: "",
};
