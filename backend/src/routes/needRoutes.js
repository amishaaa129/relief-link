const express = require("express");
const router = express.Router();

const {
  createNeed,
  getNeedById,
  updateNeedStatus,
  assignVolunteer,
  getAllNeeds
} = require("../controllers/needsController");

router.post("/", createNeed);
router.get("/", getAllNeeds);
router.get("/:id", getNeedById);
router.put("/:id/status", updateNeedStatus);
router.put("/:id/assign", assignVolunteer);

module.exports = router;
