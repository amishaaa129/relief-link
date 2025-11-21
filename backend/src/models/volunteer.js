const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    googleId: String,
    phone: String,
    skills: [String],
    availability: String,
    location: String,
    avatar: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Volunteer", VolunteerSchema);
