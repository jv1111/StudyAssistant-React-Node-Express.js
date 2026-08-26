const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
