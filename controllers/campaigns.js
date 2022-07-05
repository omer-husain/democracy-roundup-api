const Campaign = require("../models/campaign");

module.exports.list = async (req, res) => {
  const campaigns = await Campaign.find({}); //finds all campaigns
  res.json(campaigns);
};

module.exports.createCampaign = async (req, res, next) => {
  const campaign = new Campaign(req.body.campaign);
  console.log(req.body);
  console.log(req.user);
  campaign.organiser = req.user._id ?? "00001";
  campaign.username = req.user.username ?? "Placeholder";
  await campaign.save();
  console.log(campaign);
  req.flash("success", "Successfully made a new campaign!");
  res.status(201).json(campaign);
};

module.exports.showCampaign = async (req, res) => {
  const campaign = await Campaign.findById(req.params.id)
    .populate({ path: "comments", populate: { path: "author" } })
    .populate("organiser");
  console.log(campaign);
  if (!campaign) {
    req.flash("error", "Cannot find that campaign");
    res.status(400);
  }
  res.status(200).json(campaign);
};

module.exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const campaign = await Campaign.findByIdAndUpdate(id, {
    ...req.body.campaign,
  });

  await campaign.save();

  req.flash("success", "Successfully updated campaign!");
  res.redirect(`/campaigns/${campaigns._id}`);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Campaign.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted campaign!");

  res.redirect("/campaigns");
};
