const express = require("express");
const router = express.Router();
const {
  getParticipants,
  setParticipant,
  updateParticipant,
  deleteParticipant,
  getParticipant,
} = require("../controllers/participantController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getParticipants).post(protect, setParticipant);

router
  .route("/:id")
  .get(protect, getParticipant)
  .put(protect, updateParticipant)
  .delete(protect, deleteParticipant);

module.exports = router;
