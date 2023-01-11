const express = require("express");
const router = express.Router();
const {
  getParticipants,
  setParticipant,
  updateParticipant,
  deleteParticipant,
} = require("../controllers/participantController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getParticipants).post(protect, setParticipant);

router
  .route("/:id")
  .put(protect, updateParticipant)
  .delete(protect, deleteParticipant);

module.exports = router;
