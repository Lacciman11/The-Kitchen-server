const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Buyer = require("../../models/Buyer");
const Seller = require("../../models/Seller");
const Rider = require("../../models/Rider");

// ================= SIGNUP =================

// Buyer Signup
exports.registerBuyer = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, address } = req.body;

    const existingUser = await Buyer.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newBuyer = new Buyer({ name, email, phoneNumber, password: hashedPassword, address });
    await newBuyer.save();

    res.status(201).json({ message: "Buyer registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Seller Signup
exports.registerSeller = async (req, res) => {
  try {
    const {
      title,
      firstName,
      lastName,
      phoneNumber,
      address,
      city,
      state,
      landmark,
      storeName,
      description,
      email,
      password,
    } = req.body;

    const existingUser = await Seller.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      title,
      firstName,
      lastName,
      phoneNumber,
      address,
      city,
      state,
      landmark,
      storeName,
      description,
      email,
      password: hashedPassword,
    });
    await newSeller.save();

    res.status(201).json({ message: "Seller registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Rider Signup
exports.registerRider = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      address,
      state,
      city,
      password,
      hasLogisticsExperience,
      hasEcommerceExperience,
      isCourierRegistered,
    } = req.body;

    const existingUser = await Rider.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRider = new Rider({
      name,
      email,
      phoneNumber,
      address,
      state,
      city,
      password: hashedPassword,
      hasLogisticsExperience,
      hasEcommerceExperience,
      isCourierRegistered,
    });
    await newRider.save();

    res.status(201).json({ message: "Rider registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Buyer.findOne({ email });
    let role = "buyer";

    if (!user) {
      user = await Seller.findOne({ email });
      role = "seller";
    }
    if (!user) {
      user = await Rider.findOne({ email });
      role = "rider";
    }
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // 🔹 Generate JWT
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // 🔹 Store JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      role,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || `${user.firstName} ${user.lastName}`,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= LOGOUT =================
exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
