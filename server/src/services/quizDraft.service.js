const QuizDraft = require("../models/quizDraft.model");

const getDraft = async (userId) => {
  return QuizDraft.findOne({ userId });
};

const saveDraft = async (userId, subject, quizName, items) => {
  return QuizDraft.findOneAndUpdate(
    { userId },
    {
      $set: {
        subject,
        quizName,
        items,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    },
  );
};

const deleteDraft = async (userId) => {
  return QuizDraft.findOneAndDelete({ userId });
};

module.exports = {
  getDraft,
  saveDraft,
  deleteDraft,
};
