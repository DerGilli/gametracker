const express = require("express");
const router = express.Router();
const {
  getSeessions,
  setSession,
  deleteSession,
} = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getSeessions).post(protect, setSession);
router.route("/:id").delete(protect, deleteSession);

module.exports = router;
