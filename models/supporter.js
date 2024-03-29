const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supporterSchema = new Schema({
  person: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Supporter", supporterSchema);
