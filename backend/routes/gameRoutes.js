const express = require("express");
const router = express.Router();
const {
  getGames,
  setGame,
  updateGame,
  deleteGame,
} = require("../controllers/gameController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGames).post(protect, setGame);
router.route("/:id").put(protect, updateGame).delete(protect, deleteGame);

module.exports = router;
