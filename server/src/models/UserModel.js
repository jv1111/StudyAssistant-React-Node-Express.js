const mongoose = require("mongoose");
require("mongoose-type-email");//type: mongoose.SchemaTypes.Email

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        unique: true,
        required: true
    },
    verifiedEmail: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;