const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  title: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  landmark: { type: String },
  storeName: { type: String, required: true },
  description: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
   profilePicUrl:{ type: String,}
});

module.exports = mongoose.model("Seller", sellerSchema);
