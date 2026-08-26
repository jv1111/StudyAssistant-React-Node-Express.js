const createQuizResponse = (quiz) => ({
  id: quiz._id,
  subjectId: quiz.subjectId,
  quizName: quiz.quizName,
  items: quiz.items,
  numberOfItems: quiz.numberOfItems,
  createdAt: quiz.createdAt,
  updatedAt: quiz.updatedAt,
});

const createRecordResponse = (record) => ({
  id: record._id,
  subject: record.subject,
  quizName: record.quizName,
  score: record.score,
  numberOfItems: record.numberOfItems,
  date: record.date,
});

module.exports = {
  createQuizResponse,
  createRecordResponse,
};
