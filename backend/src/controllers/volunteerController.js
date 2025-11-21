const Volunteer = require("../models/volunteer");

exports.createVolunteer = async (req, res) => {
  try {
    console.log("Incoming volunteer body:", req.body);

    const vol = new Volunteer(req.body);
    await vol.save();

    res.status(201).json({
      success: true,
      message: "Volunteer registered successfully",
      volunteer: vol
    });

  } catch (error) {
    console.error("Error creating volunteer:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not register volunteer."
    });
  }
};
