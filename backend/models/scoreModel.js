const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    value: {
      type: Number,
      required: [true, "Please add a value"],
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide a session"],
      ref: "Session",
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide a participant"],
      ref: "Participant",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Score", scoreSchema);
