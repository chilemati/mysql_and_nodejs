exports.createCookie = (res, token) => {
  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 1.2,
    httpOnly: true,
  });
};
