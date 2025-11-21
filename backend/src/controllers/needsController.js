const Need = require("../models/need");
const Volunteer = require("../models/volunteer");

// CREATE NEED
exports.createNeed = async (req, res) => {
  try {
    const need = new Need(req.body);
    await need.save();

    return res.status(201).json({
      success: true,
      message: "Need reported successfully",
      need,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: error.message,
    });
  }
};

// GET ALL NEEDS
exports.getAllNeeds = async (req, res) => {
  try {
    const needs = await Need.find().sort({ createdAt: -1 });
    res.json({ success: true, needs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch needs" });
  }
};

// GET SINGLE NEED BY ID
exports.getNeedById = async (req, res) => {
  try {
    const need = await Need.findById(req.params.id);

    if (!need) {
      return res.status(404).json({ success: false, message: "Need not found" });
    }

    res.json({ success: true, need });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }
};

// UPDATE STATUS (pending / assigned / resolved)
exports.updateNeedStatus = async (req, res) => {
  try {
    const updated = await Need.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: "Need not found" });

    res.json({ success: true, need: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid update" });
  }
};

// ASSIGN VOLUNTEER
exports.assignVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.body;

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer)
      return res.status(404).json({ success: false, message: "Volunteer not found" });

    const updated = await Need.findByIdAndUpdate(
      req.params.id,
      {
        assignedVolunteer: volunteerId,
        status: "assigned",
      },
      { new: true }
    );

    res.json({ success: true, need: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid assignment" });
  }
};
