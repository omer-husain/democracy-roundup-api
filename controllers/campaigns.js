const Campaign = require("../models/campaign");

module.exports.list = async (req, res) => {
  const campaigns = await Campaign.find({}); //finds all campaigns
  res.json(campaigns);
};

module.exports.createCampaign = async (req, res, next) => {
  const campaign = new Campaign(req.body.campaign);

  // campaign.images = req.files.map((f) => ({
  //   url: f.path,
  //   filename: f.filename,
  // }));
  campaign.organiser = req.user._id;
  await campaign.save();
  console.log(campaign);
  req.flash("success", "Successfully made a new campaign!");
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
  const imgs = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));

  campaign.images.push(...imgs);

  await campaign.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campaign.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash("success", "Successfully updated campaign!");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted campground!");

  res.redirect("/campgrounds");
};
