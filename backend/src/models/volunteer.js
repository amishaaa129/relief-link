const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    skills: [{ type: String, required: true }],
    availability: { type: String, required: true },
    location: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Volunteer", VolunteerSchema);
