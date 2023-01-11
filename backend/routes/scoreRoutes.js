const express = require("express");
const router = express.Router();
const {
  getScores,
  setScore,
  updateScore,
  deleteScore,
} = require("../controllers/scoreController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getScores).post(protect, setScore);
router.route("/:id").put(protect, updateScore).delete(protect, deleteScore);

module.exports = router;
