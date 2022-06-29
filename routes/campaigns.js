const express = require("express");
const router = express.Router();
const campaigns = require("../controllers/campaigns");

router
  .route("/")
  .get(campaigns.list) //gets all campaigns by passing function in controllers file
  .post(campaigns.createCampaign);

router
  .route("/:id")
  .get(campaigns.showCampaign)
  .put(campaigns.updateCampaign)
  .delete(campaigns.delete);

module.exports = router;
