const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        ref: "User",
        required: true
    },
    verificationToken: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,//1 hour
    },
});

const TokenRequestModel = mongoose.model('Token', TokenSchema);

module.exports = TokenRequestModel;