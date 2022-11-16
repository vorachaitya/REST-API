const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create geolocation schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

//create driver Schema and model
const DriverSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  rank: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
  geometry: GeoSchema,
});

const Driver = mongoose.model("USER", DriverSchema);

module.exports = Driver;
