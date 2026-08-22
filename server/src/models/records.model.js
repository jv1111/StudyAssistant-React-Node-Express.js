const mongoose = require("mongoose");

const RecordsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  quizName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  numberOfItems: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Record = mongoose.model("Record", RecordsSchema);
module.exports = Record;
