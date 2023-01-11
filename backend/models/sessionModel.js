const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      required: [true, "Please add at least one participant"],
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Game",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);
