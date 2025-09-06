const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String },
  city: { type: String },
  password: { type: String, required: true },
  hasLogisticsExperience: { type: Boolean, default: false },
  hasEcommerceExperience: { type: Boolean, default: false },
  isCourierRegistered: { type: Boolean, default: false }
});

module.exports = mongoose.model("Rider", riderSchema);
