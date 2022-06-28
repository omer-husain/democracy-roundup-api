const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const CampaignSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  organizer: { type: String, required: true },
  comments: [],
});

CampaignSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Campaign", CampaignSchema);
