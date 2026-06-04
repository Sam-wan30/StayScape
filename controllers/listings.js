const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({ accessToken: mapToken });

async function geocodeLocation(query) {
  const response = await geoCodingClient
    .forwardGeocode({ query, limit: 1 })
    .send();
  return response.body.features[0]?.geometry || null;
}

module.exports.index = async (req, res) => {
  let allListings = await Listing.find();
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  if (!req.file) {
    throw new ExpressError(400, "Listing image is required.");
  }

  const geometry = await geocodeLocation(req.body.listing.location);
  if (!geometry) {
    throw new ExpressError(400, "Could not find location. Please check the address.");
  }

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { filename: req.file.filename, url: req.file.path };
  newListing.geometry = geometry;
  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you trying to edit for does not exist!");
    return res.redirect("/listings");
  }
  let imageUrl = listing.image.url.replace("/upload", "/upload/w_250,h_160");
  res.render("listings/edit.ejs", { listing, imageUrl });
};

module.exports.updateListing = async (req, res, next) => {
  let { id } = req.params;
  const geometry = await geocodeLocation(
    `${req.body.listing.location}, ${req.body.listing.country}`
  );
  if (!geometry) {
    throw new ExpressError(400, "Could not find location. Please check the address.");
  }

  req.body.listing.geometry = geometry;
  let updatedListing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (typeof req.file !== "undefined") {
    updatedListing.image = { url: req.file.path, filename: req.file.filename };
    await updatedListing.save();
  }
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.filter = async (req, res, next) => {
  let { id } = req.params;
  let allListings = await Listing.find({ category: id });
  if (allListings.length != 0) {
    res.locals.success = `Listings filtered by ${id.replace(/-/g, " ")}!`;
    return res.render("listings/index.ejs", { allListings });
  }
  req.flash("error", `No listings found for ${id.replace(/-/g, " ")}!`);
  return res.redirect("/listings");
};

module.exports.search = async (req, res) => {
  const raw = req.query.q;
  if (!raw || !String(raw).trim()) {
    req.flash("error", "Please enter a search query!");
    return res.redirect("/listings");
  }

  const input = String(raw).trim().replace(/\s+/g, " ");

  let allListings = await Listing.find({
    title: { $regex: input, $options: "i" },
  });
  if (allListings.length != 0) {
    res.locals.success = "Listings matched by title.";
    return res.render("listings/index.ejs", { allListings });
  }

  allListings = await Listing.find({
    category: { $regex: input, $options: "i" },
  }).sort({ _id: -1 });
  if (allListings.length != 0) {
    res.locals.success = "Listings matched by category.";
    return res.render("listings/index.ejs", { allListings });
  }

  allListings = await Listing.find({
    country: { $regex: input, $options: "i" },
  }).sort({ _id: -1 });
  if (allListings.length != 0) {
    res.locals.success = "Listings matched by country.";
    return res.render("listings/index.ejs", { allListings });
  }

  allListings = await Listing.find({
    location: { $regex: input, $options: "i" },
  }).sort({ _id: -1 });
  if (allListings.length != 0) {
    res.locals.success = "Listings matched by location.";
    return res.render("listings/index.ejs", { allListings });
  }

  const price = parseInt(input, 10);
  if (Number.isInteger(price)) {
    allListings = await Listing.find({ price: { $lte: price } }).sort({
      price: 1,
    });
    if (allListings.length != 0) {
      res.locals.success = `Listings under ₹${price.toLocaleString("en-IN")}.`;
      return res.render("listings/index.ejs", { allListings });
    }
  }

  req.flash("error", "No listings found. Try a different search.");
  return res.redirect("/listings");
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};

module.exports.reserveListing = async (req, res) => {
  let { id } = req.params;
  req.flash("success", "Reservation request received! We'll email you the details.");
  res.redirect(`/listings/${id}`);
};
