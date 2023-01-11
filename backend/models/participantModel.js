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
      required: [true, "Please add a name"],
    },
    score: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Score",
    },
  },
  {
    timestamps: true,
  }
);
participantSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Participant", participantSchema);
