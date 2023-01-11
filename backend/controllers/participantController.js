const asyncHandler = require("express-async-handler");
const Participant = require("../models/participantModel");
const User = require("../models/userModel");

// @desc    Get participants
// @route   GET /api/participants
// @access  Private
const getParticipants = asyncHandler(async (req, res) => {
  const participants = await Participant.find({ user: req.user.id });

  res.json(participants);
});

// @desc    Set participant
// @route   POST /api/participants
// @access  Private
const setParticipant = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }

  if (await Participant.findOne({ user: req.user.id, name: req.body.name })) {
    res.status(400);
    throw new Error("Name already exists");
  }

  const participant = await Participant.create({
    name: req.body.name,
    user: req.user.id,
  });

  res.json(participant);
});

// @desc    Update participant
// @route   GET /api/participants/:id
// @access  Private
const updateParticipant = asyncHandler(async (req, res) => {
  const participant = await Participant.findById(req.params.id);

  if (!participant) {
    res.status(400);
    throw new Error("Participant not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (participant.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not allowed");
  }

  const updatedParticipant = await Participant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.json(updatedParticipant);
});

// @desc    Delete participant
// @route   DELETE /api/participants/:id
// @access  Private
const deleteParticipant = asyncHandler(async (req, res) => {
  const participant = await Participant.findById(req.params.id);

  if (!participant) {
    res.status(400);
    throw new Error("Participant not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (participant.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await participant.remove();

  res.status(204);
});

module.exports = {
  getParticipants,
  setParticipant,
  updateParticipant,
  deleteParticipant,
};
