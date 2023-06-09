exports.createCookie = (res, token, min) => {
  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * min,
    httpOnly: true,
  });
};
