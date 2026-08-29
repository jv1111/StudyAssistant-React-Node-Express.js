const QuizDraft = require("../models/quizDraft.model");

const getCreateQuizDraft = async (userId) => {
  return QuizDraft.findOne({
    userId,
    mode: "create",
  });
};

const saveCreateQuizDraft = async (
  userId,
  isPreview,
  subject,
  quizName,
  items,
) => {
  return QuizDraft.findOneAndUpdate(
    {
      userId,
      mode: "create",
    },
    {
      $set: {
        mode: "create",
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
  return QuizDraft.findOneAndDelete({
    userId,
    mode: "create",
  });
};

const getUpdateQuizDraft = async (userId, quizId) => {
  return QuizDraft.findOne({
    userId,
    mode: "update",
    quizId,
  });
};

const saveUpdateQuizDraft = async (
  userId,
  quizId,
  subject,
  quizName,
  items,
) => {
  return QuizDraft.findOneAndUpdate(
    {
      userId,
      mode: "update",
      quizId,
    },
    {
      $set: {
        mode: "update",
        isPreview: false,
        quizId,
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

const deleteUpdateQuizDraft = async (userId, quizId) => {
  return QuizDraft.findOneAndDelete({
    userId,
    mode: "update",
    quizId,
  });
};

module.exports = {
  getCreateQuizDraft,
  saveCreateQuizDraft,
  deleteCreateQuizDraft,

  getUpdateQuizDraft,
  saveUpdateQuizDraft,
  deleteUpdateQuizDraft,
};
