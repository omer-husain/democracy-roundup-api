const express = require("express");
const router = express.Router();
const campaigns = require("../controllers/campaigns");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware");

router
  .route("/")
  .get(catchAsync(campaigns.list)) //gets all campaigns by passing function in controllers file
  .post(isLoggedIn, catchAsync(campaigns.createCampaign));

router
  .route("/:id")
  .get(catchAsync(campaigns.showCampaign))
  .put(catchAsync(campaigns.updateCampaign))
  .delete(catchAsync(campaigns.delete));

module.exports = router;
