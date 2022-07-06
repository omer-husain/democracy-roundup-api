const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");

router.route("/register").post(catchAsync(users.register));

router.route("/login").post(
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    passReqToCallback: true,
  }),
  users.login
);

router.get("/logout", users.logout);

module.exports = router;
