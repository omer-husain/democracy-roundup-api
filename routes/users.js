const express = require("express");
const router = express.Router();
// const users = require("../controllers/users");

router.route("/").get().post();

router.route("/:id").get().put().delete();

module.exports = router;
