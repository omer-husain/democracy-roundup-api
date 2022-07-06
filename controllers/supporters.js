const Campaign = require("../models/campaign");
const Supporter = require("../models/supporter");

module.exports.createSupporter = async (req, res) => {
  const campaign = await Campaign.findById(req.body.myParamsId);
  console.log(campaign);
  const supporter = new Supporter();
  console.log(supporter);
  supporter.person = req.user._id;
  campaign.supporters.push(supporter);
  await supporter.save();
  await campaign.save();
  req.flash("success", "Added a new Supporter!");
  res.status(201).json(supporter);
};
