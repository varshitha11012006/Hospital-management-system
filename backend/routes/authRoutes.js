const express = require("express");
const router = express.Router();

const User = require("../models/User");
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);

// GET ALL DOCTORS (IMPORTANT FIX)
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;