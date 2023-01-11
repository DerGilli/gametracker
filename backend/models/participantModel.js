const mongoose = require("mongoose");

const participantSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      unique: true,
      required: [true, "Please add a name"],
    },
    score: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Score",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Participant", participantSchema);
