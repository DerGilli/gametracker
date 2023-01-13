const asyncHandler = require("express-async-handler");
const Session = require("../models/sessionModel");
const User = require("../models/userModel");
const Game = require("../models/gameModel");
const Participant = require("../models/participantModel");

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
  const { participants, game } = req.body;
  if (!participants || !game) {
    res.status(400);
    throw new Error("Please provide necessary information");
  }

  if (!(await Game.findById(game))) {
    res.status(400);
    throw new Error("Game not found");
  }

  for (let i = 0; i < participants.length; i++) {
    const participant = participants[i];
    if (!(await Participant.findById(participant))) {
      res.status(400);
      throw new Error("At least one Participant could not be found");
    }
  }

  const session = await Session.create({
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

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (session.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await session.remove();

  res.status(204);
});

module.exports = {
  getSeessions,
  setSession,
  deleteSession,
};
