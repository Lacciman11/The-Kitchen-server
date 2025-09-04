const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model("Buyer", buyerSchema);
