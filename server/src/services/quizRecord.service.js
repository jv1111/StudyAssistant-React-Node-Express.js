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

const getRecordedSubjects = async (userId, searchQuery, skipCount = 0) => {
  const { skip, limit } = getPagination(skipCount);

  const filter = {
    userId,
  };

  if (searchQuery) {
    filter.subject = {
      $regex: new RegExp(searchQuery, "i"),
    };
  }

  const subjects = await QuizRecord.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: "$subject",
        recordCount: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $skip: skip,
    },
    {
      // Fetch one extra record so we can determine
      // whether another page exists.
      $limit: limit + 1,
    },
    {
      $lookup: {
        from: "subjects",
        let: {
          subjectName: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$name", "$$subjectName"],
                  },
                  {
                    $eq: ["$userId", userId],
                  },
                ],
              },
            },
          },
        ],
        as: "subjectDocument",
      },
    },
    {
      $unwind: "$subjectDocument",
    },
    {
      $project: {
        _id: "$subjectDocument._id",
        subject: "$_id",
        recordCount: 1,
      },
    },
  ]);

  const hasMore = subjects.length > limit;

  if (hasMore) {
    subjects.pop();
  }

  return {
    items: subjects,
    hasMore,
  };
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

  const records = await QuizRecord.find(filter)
    .sort({ completedAt: -1, _id: -1 })
    .skip(skip)
    .limit(limit + 1);

  const hasMore = records.length > limit;

  if (hasMore) {
    records.pop();
  }

  return {
    items: records,
    hasMore,
  };
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
