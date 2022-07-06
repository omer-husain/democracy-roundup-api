const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const CampaignSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    organiser: { type: Schema.Types.ObjectId, ref: "User" },
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
    legislature: { type: String },
  },
  { timestamps: true }
);

CampaignSchema.plugin(passportLocalMongoose, {
  usernameField: "userName",
  usernameUnique: false,
});

module.exports = mongoose.model("Campaign", CampaignSchema);
