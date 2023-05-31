const mongoose = require("mongoose");

const AutoSaveSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    quizId: {
        type: mongoose.Schema.ObjectId,
        ref: "Quiz",
    },
    key: {
        type: String,
        require: true
    },
    data: {
        type: Object,
        required: true
    }
});

const AutoSaveData = mongoose.model('AutoSaveData', AutoSaveSchema);
module.exports = AutoSaveData;