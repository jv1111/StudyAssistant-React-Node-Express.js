const mongoose = require("mongoose");
require("mongoose-type-email"); //type: mongoose.SchemaTypes.Email

const GoogleUserSchema = mongoose.Schema({
  profileImg: {
    type: Object,
    default: {
      url: null,
      filePath: null,
    },
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    minlength: 3,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GoogleUser = mongoose.model("googleuser", GoogleUserSchema);
module.exports = GoogleUser;
