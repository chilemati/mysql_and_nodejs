const { veriyToken } = require("../services/verifyToken");

exports.allowLogin = async (req, res, next) => {
  if (req.cookies.jwt) {
    //verify token
    // console.log("jwt: ", req.cookies);
    let token = await veriyToken(req.cookies.jwt);
    this.currentUser.user = token;
    console.log(token);
    next();
  } else {
    // res.json({ err: "aboy! login first!" });
    // res.redirect(301, "/api/loginGet");
    res.render("Login");
  }
};

exports.currentUser = {
  user: "",
};
