const express = require("express");
const { 
  registerBuyer, 
  registerSeller, 
  registerRider, 
  loginUser, 
  logoutUser 
} = require("../controllers/authController");

const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

// ================= SIGNUP ROUTES =================
router.post("/buyer", registerBuyer);
router.post("/seller", registerSeller);
router.post("/rider", registerRider);

// ================= LOGIN / LOGOUT =================
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// ================= PROTECTED DASHBOARDS =================
router.get("/buyer/dashboard", authMiddleware(["buyer"]), (req, res) => {
  res.json({
    message: "Welcome Buyer Dashboard ✅",
    user: req.user
  });
});

router.get("/seller/dashboard", authMiddleware(["seller"]), (req, res) => {
  res.json({
    message: "Welcome Seller Dashboard ✅",
    user: req.user
  });
});

router.get("/rider/dashboard", authMiddleware(["rider"]), (req, res) => {
  res.json({
    message: "Welcome Rider Dashboard ✅",
    user: req.user
  });
});

module.exports = router;
