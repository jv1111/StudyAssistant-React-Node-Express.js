const QuizDraft = require("../models/quizDraft.model");

const getCreateQuizDraft = async (userId) => {
  return QuizDraft.findOne({ userId });
};

const saveCreateQuizDraft = async (
  userId,
  isPreview,
  subject,
  quizName,
  items,
) => {
  return QuizDraft.findOneAndUpdate(
    { userId },
    {
      $set: {
        isPreview,
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

const deleteCreateQuizDraft = async (userId) => {
  return QuizDraft.findOneAndDelete({ userId });
};

module.exports = {
  getCreateQuizDraft,
  saveCreateQuizDraft,
  deleteCreateQuizDraft,
};
