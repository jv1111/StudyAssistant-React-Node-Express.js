const mongoose = require("mongoose");

const QuizSessionSchema = mongoose.Schema(
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

    status: {
      type: String,
      enum: ["in_progress", "paused", "completed", "abandoned"],
      default: "in_progress",
    },

    randomizeQuestions: {
      type: Boolean,
      default: false,
    },

    currentItem: {
      type: Number,
      default: 0,
      min: 0,
    },

    itemOrder: [
      {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
    ],

    score: {
      type: Number,
      default: 0,
      min: 0,
    },

    answeredItems: {
      type: Number,
      default: 0,
      min: 0,
    },

    timeLimit: {
      type: Number,
      default: null,
      min: 0,
    },

    timeRemaining: {
      type: Number,
      default: null,
      min: 0,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    pausedAt: {
      type: Date,
      default: null,
    },

    resumedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    answers: [
      {
        itemId: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },

        answer: {
          type: mongoose.Schema.Types.Mixed,
          default: null,
        },

        correct: {
          type: Boolean,
          default: false,
        },

        answeredAt: {
          type: Date,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const QuizSession = mongoose.model("QuizSession", QuizSessionSchema);

module.exports = QuizSession;
