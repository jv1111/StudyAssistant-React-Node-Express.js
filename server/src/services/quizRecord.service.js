const QuizRecord = require("../models/quizRecords.model");

const AppError = require("../utils/AppError");
const { getPagination } = require("../utils/pagination");

const saveRecord = async (session, quiz) => {
  const items = session.answers.map((sessionAnswer) => {
    const quizItem = quiz.items.id(sessionAnswer.itemId);

    return {
      question: quizItem.question,
      answer: sessionAnswer.answer,
      correctAnswer: quizItem.answer,
      correct: sessionAnswer.correct,
      answeredAt: sessionAnswer.answeredAt,
    };
  });

  return QuizRecord.create({
    userId: session.userId,
    quizId: session.quizId,
    quizName: quiz.quizName,
    subjectId: quiz.subjectId._id,
    subject: quiz.subjectId.name,
    quizType: session.quizType,
    score: session.score,
    numberOfItems: quiz.numberOfItems,
    items,
    completedAt: session.completedAt,
  });
};

const getRecordedSubjects = async (userId, searchQuery) => {
  const match = {
    userId,
  };

  if (searchQuery) {
    match.subject = {
      $regex: new RegExp(searchQuery, "i"),
    };
  }

  return QuizRecord.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$subjectId",
        name: { $first: "$subject" },
        recordCount: { $sum: 1 },
      },
    },
    { $sort: { name: 1 } },
  ]);
};

const getRecordsBySubject = async (
  userId,
  subjectId,
  searchQuery,
  skipCount = 0,
) => {
  const filter = {
    userId,
    subjectId,
  };

  if (searchQuery) {
    filter.quizName = {
      $regex: new RegExp(searchQuery, "i"),
    };
  }

  const { skip, limit } = getPagination(skipCount);

  return QuizRecord.find(filter)
    .sort({ completedAt: -1 })
    .skip(skip)
    .limit(limit);
};

const getRecordByRecordId = async (userId, recordId) => {
  const record = await QuizRecord.findOne({
    _id: recordId,
    userId,
  });

  if (!record) {
    throw new AppError("Quiz record not found", 404);
  }

  return record;
};

module.exports = {
  saveRecord,
  getRecordedSubjects,
  getRecordsBySubject,
  getRecordByRecordId,
};
