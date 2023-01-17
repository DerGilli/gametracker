const asyncHandler = require("express-async-handler");
const Score = require("../models/scoreModel");
const Session = require("../models/sessionModel");
const Participant = require("../models/participantModel");
const User = require("../models/userModel");

// @desc    Get scores
// @route   GET /api/scores
// @access  Private
const getScores = asyncHandler(async (req, res) => {
  const scores = await Score.find({ user: req.user.id });

  res.json(scores);
});

// @desc    Set score
// @route   POST /api/scores
// @access  Private
const setScore = asyncHandler(async (req, res) => {
  const { session, value, participant } = req.body;
  if (!session || value === undefined || !participant) {
    res.status(400);
    throw new Error("Please provide necessary information");
  }

  const sessionExists = await Session.findById(session);
  if (!sessionExists) {
    res.status(400);
    throw new Error("Session not found");
  }

  const participantExists = await Participant.findById(participant);
  if (!participantExists) {
    res.status(400);
    throw new Error("Participant not found");
  }

  const scoreAlreadyExists =
    (await Score.find({ session, participant })).length > 0;
  if (scoreAlreadyExists) {
    res.status(400);
    throw new Error("Score already exists");
  }

  const score = await Score.create({
    session: session,
    user: req.user.id,
    value: value,
    participant: participant,
  });

  res.json(score);
});

// @desc    Update score
// @route   GET /api/scores/:id
// @access  Private
const updateScore = asyncHandler(async (req, res) => {
  const score = await Score.findById(req.params.id);

  if (!score) {
    res.status(400);
    throw new Error("Score not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (score.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not allowed");
  }

  const updatedScore = await Score.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedScore);
});

// @desc    Delete score
// @route   DELETE /api/scores/:id
// @access  Private
const deleteScore = asyncHandler(async (req, res) => {
  const score = await Score.findById(req.params.id);

  if (!score) {
    res.status(400);
    throw new Error("Score not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (score.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await score.remove();

  res.status(204);
});

module.exports = {
  getScores,
  setScore,
  updateScore,
  deleteScore,
};
