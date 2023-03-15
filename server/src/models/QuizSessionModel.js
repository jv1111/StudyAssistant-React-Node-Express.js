const mongoose = require("mongoose");

const QuizSessionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    quizId: {
        type: mongoose.Schema.ObjectId,
        ref: "Quiz",
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    quizName: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    correct: {
        type: Boolean,
        default: false
    },
    answered: {
        type: Boolean,
        default: false
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

const QuizSession = mongoose.model("QuizSession", QuizSessionSchema);
module.exports = QuizSession;