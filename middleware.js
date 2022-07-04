module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //store the url they are requesting
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in");
    return res.status(401).json({
      redirectMessage: "Error - You must be signed in",
      redirectUrl: "/login",
    });
  }

  next();
};
