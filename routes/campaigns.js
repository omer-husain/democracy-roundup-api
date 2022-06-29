const express = require("express");
const router = express.Router();
const campaigns = require("../controllers/campaigns");

router.route("/").get().post();

router.route("/:id").get().put().delete();

module.exports = router;
