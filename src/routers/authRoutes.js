const express = require("express");
const { registerBuyer, registerSeller, registerRider } = require("../controllers/authController");

const router = express.Router();

router.post("/buyer", registerBuyer);
router.post("/seller", registerSeller);
router.post("/rider", registerRider);

module.exports = router;
