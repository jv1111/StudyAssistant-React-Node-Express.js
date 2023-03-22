const mongoose = require("mongoose");

const AutoSaveSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
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