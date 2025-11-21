const mongoose = require("mongoose");

const NeedSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    disasterType: { type: String, required: true },
    needTypes: [{ type: String, required: true }],
    numberOfPeople: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String },
    urgency: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "assigned", "resolved"],
      default: "pending",
    },

    assignedVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      default: null,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Need", NeedSchema);
