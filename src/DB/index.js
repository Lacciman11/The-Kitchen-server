const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI ;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(" MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw err;
  }
}

async function closeDB() {
  try {
    await mongoose.connection.close();
    console.log("🛑MongoDB connection closed");
  } catch (err) {
    console.error("Error closing MongoDB:", err.message);
  }
}

module.exports = { connectDB, closeDB };