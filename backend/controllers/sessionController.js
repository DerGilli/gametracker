const asyncHandler = require("express-async-handler");
const Session = require("../models/sessionModel");
const User = require("../models/userModel");

// @desc    Get session
// @route   GET /api/sessions
// @access  Private
const getSeessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ user: req.user.id });

  res.json(sessions);
});

// @desc    Set session
// @route   POST /api/sessions
// @access  Private
const setSession = asyncHandler(async (req, res) => {
  const { name, participants, game } = req.body;
  if (!name || !participants || !game) {
    res.status(400);
    throw new Error("Please provide necessary information");
  }

  const session = await Session.create({
    name: name,
    user: req.user.id,
    participants: participants,
    game: game,
  });

  res.json(session);
});

// @desc    Delete game
// @route   DELETE /api/games/:id
// @access  Private
const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    res.status(400);
    throw new Error("Session not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (session.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await session.remove();

  res.status(204);
});

module.exports = {
  getGames,
  setGame,
  updateGame,
  deleteGame,
};
