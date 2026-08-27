const mongoose = require("mongoose");

const QuizDraftSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    subject: {
      type: String,
      trim: true,
      default: "",
    },

    quizName: {
      type: String,
      trim: true,
      default: "",
    },

    items: {
      type: [
        {
          question: {
            type: String,
            trim: true,
            default: "",
          },

          choices: {
            type: [String],
            default: ["", "", "", ""],
          },

          answer: {
            type: String,
            trim: true,
            default: "",
          },

          generationMethod: {
            type: String,
            enum: ["random", "ai", "custom"],
            default: "random",
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const QuizDraft = mongoose.model("QuizDraft", QuizDraftSchema);

module.exports = QuizDraft;
