const mongoose = require("mongoose");
require("mongoose-type-email");

const userSchema = new mongoose.Schema(
  {
    profileImg: {
      url: {
        type: String,
        default: null,
      },
      filePath: {
        type: String,
        default: null,
      },
    },

    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
