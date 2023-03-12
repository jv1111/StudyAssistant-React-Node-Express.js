const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
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
    items: {
        type: Array,
        require: true,
        minLenght: 3
    },
    numberOfItems: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;