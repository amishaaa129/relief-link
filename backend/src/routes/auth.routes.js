const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Volunteer = require("../models/volunteer");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Check if volunteer exists
    let volunteer = await Volunteer.findOne({ email });

    if (!volunteer) {
      volunteer = new Volunteer({
        name,
        email,
        googleId: sub,
        avatar: picture,
      });

      await volunteer.save();
    }

    // Create JWT
    const token = jwt.sign(
      { id: volunteer._id, email: volunteer.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      volunteer,
    });

  } catch (err) {
    console.error("Google login error:", err);
    res.status(401).json({ success: false, error: "Invalid Google login" });
  }
});

module.exports = router;
