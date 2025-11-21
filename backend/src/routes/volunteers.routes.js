const express = require("express");
const router = express.Router();
const Volunteer = require("../models/volunteer");

router.post("/", async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json({ success: true, volunteer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json({ success: true, volunteers });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
