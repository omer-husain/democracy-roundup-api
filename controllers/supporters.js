const Campaign = require("../models/campaign");
const Supporter = require("../models/supporter");

module.exports.createSupporter = async (req, res) => {
  console.log(req.user);
  const campaign = await Campaign.findById(req.params.id);
  console.log(campaign);
  const supporter = new Supporter({ name: req.body.supporter });
  console.log(supporter);
  supporter.person = req.user._id;
  campaign.supporters.push(supporter);
  await supporter.save();
  await campaign.save();
  req.flash("success", "Added a new Supporter!");
};
