const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    creatorID: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    title: String,
    description: String,
    image: {
      url: String,
      imageID: String,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isBookmarked: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("notes", noteSchema);
module.exports = Notes;
