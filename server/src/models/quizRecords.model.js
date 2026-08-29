const mongoose = require("mongoose");

const QuizRecordSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    quizId: {
      type: mongoose.Schema.ObjectId,
      ref: "Quiz",
      required: true,
    },

    quizName: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    quizType: {
      type: String,
      enum: ["enumeration", "multiple_choice"],
      required: true,
    },

    score: {
      type: Number,
      required: true,
      min: 0,
    },

    numberOfItems: {
      type: Number,
      required: true,
      min: 0,
    },

    items: [
      {
        question: {
          type: String,
          required: true,
        },

        answer: {
          type: String,
          default: null,
          trim: true,
        },

        correctAnswer: {
          type: String,
          required: true,
          trim: true,
        },

        correct: {
          type: Boolean,
          required: true,
        },
      },
    ],

    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const QuizRecord = mongoose.model("QuizRecord", QuizRecordSchema);

module.exports = QuizRecord;
