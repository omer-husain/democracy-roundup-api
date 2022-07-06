const express = require("express");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
// const campaigns = require("../controllers/campaigns");
const supporters = require("../controllers/supporters");

router.post("/", catchAsync(supporters.createSupporter));
router.get("/"), catchAsync((supporters.list));


// router.delete("/:id").get().put().delete();

module.exports = router;
