const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    subjectId: {
      type: mongoose.Schema.ObjectId,
      ref: "Subject",
      required: true,
    },

    quizName: {
      type: String,
      required: true,
      trim: true,
    },

    items: {
      type: [
        {
          question: {
            type: String,
            required: true,
            trim: true,
          },

          answer: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
      required: true,
      minlength: 4,
    },

    numberOfItems: {
      type: Number,
      required: true,
      min: 4,
    },
  },
  {
    timestamps: true,
  },
);

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
