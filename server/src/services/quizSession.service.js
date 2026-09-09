const QuizSession = require("../models/quizSession.model");

const quizRecordService = require("./quizRecord.service");
const quizService = require("./quiz.service");

const AppError = require("../utils/AppError");

const startQuiz = async (
  userId,
  quizId,
  quizType,
  randomizeQuestions = false,
) => {
  validateQuizType(quizType);

  const quiz = await quizService.getQuiz(userId, quizId);

  let session = await QuizSession.findOne({
    userId,
    quizId,
    quizType,
    status: { $in: ["in_progress", "paused"] },
  });

  if (!session) {
    let itemOrder = quiz.items.map((item) => item._id);

    if (randomizeQuestions) {
      itemOrder.sort(() => Math.random() - 0.5);
    }

    session = await QuizSession.create({
      userId,
      quizId,
      quizType,
      randomizeQuestions,
      currentItem: 0,
      itemOrder,
      score: 0,
      answeredItems: 0,
      answers: quiz.items.map((item) => ({
        itemId: item._id,
        answer: null,
        correct: false,
        answeredAt: null,
      })),
    });
  }

  const currentQuizItem = getCurrentQuizItem(quiz, session);

  return formatQuizItemResponse(quiz, session, currentQuizItem);
};

const submitAnswer = async (userId, sessionId, quizType, answer) => {
  validateQuizType(quizType);

  const session = await QuizSession.findOne({
    _id: sessionId,
    userId,
    quizType,
  });

  if (!session) {
    throw new AppError("Quiz session not found", 404);
  }

  if (session.status !== "in_progress") {
    throw new AppError("Quiz session is not in progress", 400);
  }

  const quiz = await quizService.getQuiz(userId, session.quizId);

  const currentQuizItem = getCurrentQuizItem(quiz, session);

  if (!answer || !answer.trim()) {
    throw new AppError("Answer is required", 400);
  }

  const trimmedAnswer = answer.trim();

  const isCorrect =
    currentQuizItem.answer.trim().toLowerCase() === trimmedAnswer.toLowerCase();

  const sessionAnswer = session.answers.find(
    (item) => item.itemId.toString() === currentQuizItem._id.toString(),
  );

  if (!sessionAnswer) {
    throw new AppError("Quiz answer record not found", 404);
  }

  sessionAnswer.answer = trimmedAnswer;
  sessionAnswer.correct = isCorrect;
  sessionAnswer.answeredAt = new Date();

  session.answeredItems += 1;

  if (isCorrect) {
    session.score += 1;
  }

  session.currentItem += 1;

  if (session.currentItem >= quiz.items.length) {
    session.status = "completed";
    session.completedAt = new Date();
  }

  await session.save();

  let recordId = null;

  if (session.status === "completed") {
    const record = await quizRecordService.saveRecord(session, quiz);
    recordId = record._id;
  }

  return {
    correct: isCorrect,
    correctAnswer: currentQuizItem.answer,
    score: session.score,
    answeredItems: session.answeredItems,
    currentItem: session.currentItem,
    numberOfItems: quiz.numberOfItems,
    status: session.status,
    recordId,
  };
};

const nextQuestion = async (userId, sessionId, quizType) => {
  validateQuizType(quizType);

  const session = await QuizSession.findOne({
    _id: sessionId,
    userId,
    quizType,
  });

  if (!session) {
    throw new AppError("Quiz session not found", 404);
  }

  if (session.status === "completed") {
    throw new AppError("Quiz has already been completed", 400);
  }

  const quiz = await quizService.getQuiz(userId, session.quizId);

  const currentQuizItem = getCurrentQuizItem(quiz, session);

  return formatQuizItemResponse(quiz, session, currentQuizItem);
};

const validateQuizType = (quizType) => {
  if (!["enumeration", "multiple_choice"].includes(quizType)) {
    throw new AppError(
      "Quiz type must be either enumeration or multiple_choice",
      400,
    );
  }
};

const getCurrentQuizItem = (quiz, session) => {
  const currentItemId = session.itemOrder[session.currentItem];

  const currentQuizItem = quiz.items.id(currentItemId);

  if (!currentQuizItem) {
    throw new AppError("Quiz item not found", 404);
  }

  return currentQuizItem;
};

const formatQuizItemResponse = (quiz, session, currentQuizItem) => ({
  sessionId: session._id,
  quizId: quiz._id,
  quizName: quiz.quizName,
  quizType: session.quizType,
  currentItem: session.currentItem,
  numberOfItems: quiz.numberOfItems,
  question: currentQuizItem.question,

  choices:
    session.quizType === "multiple_choice"
      ? currentQuizItem.choices.map((choice) =>
          typeof choice === "object" && choice !== null
            ? (choice.value ?? choice.answer ?? choice.text ?? choice.label)
            : choice,
        )
      : undefined,

  score: session.score,
  answeredItems: session.answeredItems,
  status: session.status,
  randomizeQuestions: session.randomizeQuestions,
});

const deleteQuizSession = async (userId, sessionId, quizType) => {
  validateQuizType(quizType);

  const session = await QuizSession.findOne({
    _id: sessionId,
    userId,
    quizType,
  });

  if (!session) {
    throw new AppError("Quiz session not found", 404);
  }

  if (!["in_progress", "paused"].includes(session.status)) {
    throw new AppError("Quiz session cannot be deleted", 400);
  }

  await session.deleteOne();

  return {
    sessionId: session._id,
    message: "Quiz session deleted successfully",
  };
};

module.exports = {
  startQuiz,
  submitAnswer,
  nextQuestion,
  deleteQuizSession,
};
