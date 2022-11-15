const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

const Driver = mongoose.model("driver", DriverSchema);

module.exports = Driver;
