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
      subject: quiz.subjectId.name,
      quizType: session.quizType,
      score: session.score,
      numberOfItems: quiz.numberOfItems,
      items,
      completedAt: session.completedAt,
    });
  };

  const getRecords = async (userId, searchQuery, skipCount = 0) => {
    const filter = {
      userId,
    };

    if (searchQuery) {
      filter.quizName = {
        $regex: new RegExp(searchQuery, "i"),
      };
    }

    const { skip, limit } = getPagination(skipCount);

    const records = await QuizRecord.find(filter)
      .sort({ completedAt: -1 })
      .skip(skip)
      .limit(limit);

    return records;
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
    getRecords,
    getRecordByRecordId,
  };
