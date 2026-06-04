require("dotenv").config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({ accessToken: mapToken });

const mongoUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoUrl);
}

// Seed data was exported from MongoDB and uses extended JSON ($oid wrappers).
// Strip those fields so Mongoose can insert fresh documents.
const normalizeListing = (obj, { geometry }) => ({
  title: obj.title,
  description: obj.description,
  image: obj.image,
  price: obj.price,
  location: obj.location,
  country: obj.country,
  category: obj.category,
  owner: "66567b03fda820235197b582",
  geometry,
});

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    const updatedData = await Promise.all(
      initData.data.map(async (obj) => {
        let geometry = obj.geometry;
        try {
          const response = await geoCodingClient
            .forwardGeocode({
              query: `${obj.location}, ${obj.country}`,
              limit: 1,
            })
            .send();
          geometry = response.body.features[0]?.geometry || geometry;
        } catch (error) {
          console.error(
            `Geocoding failed for ${obj.location}, ${obj.country}:`,
            error
          );
        }

        return normalizeListing(obj, { geometry });
      })
    );

    await Listing.insertMany(updatedData);
    console.log("DB is initialized");
  } catch (error) {
    console.error("Error initializing DB:", error);
  }
};

initDB();
