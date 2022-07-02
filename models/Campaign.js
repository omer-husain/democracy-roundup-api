const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const CampaignSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  organiser: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  supporters: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  expiryDate: { type: Date },
  representative: { type: String },
  issue: { type: String },
});

CampaignSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Campaign", CampaignSchema);
