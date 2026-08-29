const QuizRecord = require("../models/quizRecords.model");

const AppError = require("../utils/AppError");

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
  // 1. Log the incoming arguments to ensure they are what you expect
  console.log("--- getRecords Debug ---");
  console.log("Inputs:", { userId, searchQuery, skipCount });

  const filter = {
    userId,
  };

  if (searchQuery) {
    filter.quizName = {
      $regex: new RegExp(searchQuery, "i"),
    };
  }

  // 2. Log the final filter object being passed to MongoDB
  console.log("MongoDB Filter:", filter);

  // Execute the query
  const records = await QuizRecord.find(filter)
    .sort({ completedAt: -1 })
    .skip(parseInt(skipCount))
    .limit(10);

  // 3. Log the results returned from the database
  console.log(`Found ${records.length} records.`);

  // Optional: log a tiny snippet of the first record to verify data structure
  if (records.length > 0) {
    console.log("First record ID:", records[0]._id);
  } else {
    console.log("Query returned empty array.");
  }
  console.log("------------------------");

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
