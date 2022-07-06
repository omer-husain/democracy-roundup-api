const User = require("../models/user");

module.exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      //login new registered user automaticaly
      if (err) return next(err);
      req.flash("success", "Welcome to Democracy-Roundup");
      console.log("welcome to Democracy-Roundup");

      res.status(200).json({
        redirectMessage: "welcome to Democracy-Roundup",
        redirectUrl: "/campaigns",
        auth: req.isAuthenticated(),
        user: { username: req.user.username, userId: req.user._id },
      });
    });
  } catch (e) {
    req.flash("error", e.message);
    res
      .status(400)
      .json({ redirectMessage: e.message, redirectUrl: "/signup" });
    // res.redirect("/signup");
  }
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome Back");
  const redirectUrl = req.session.returnTo || "/campaigns";
  delete req.session.returnTo;

  res.status(200).json({
    redirectMessage: "Welcome Back",
    redirectUrl: redirectUrl,
    auth: req.isAuthenticated(),
    user: { username: req.user.username, userId: req.user._id },
  });
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "GoodBye!");
  res.status(200).json({
    redirectMessage: "GoodBye!!!!",
    redirectUrl: "/campaigns",
  });
};
