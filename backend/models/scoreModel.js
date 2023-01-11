const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    score: {
      type: Number,
      required: [true, "Please add a value"],
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide a session"],
      ref: "Session",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Score", scoreSchema);
