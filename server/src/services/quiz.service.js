const Quiz = require("../models/quiz.model");
const Subject = require("../models/subject.model");
const QuizSession = require("../models/quizSession.model");

const Records = require("../models/records.model");
const AutoSave = require("../models/autoSave.model");

const dateFormatter = require("../utils/dateFormatter");
const { savePDF } = require("../utils/pdfHandler");

const AppError = require("../utils/AppError");

const previewQuiz = async (subject, quizName, items) => {
  if (!subject || !subject.trim()) {
    throw new AppError("Subject is required", 400);
  }

  if (!quizName || !quizName.trim()) {
    throw new AppError("Quiz name is required", 400);
  }

  if (!items || items.length < 4) {
    throw new AppError("Quiz must have at least 4 items", 400);
  }

  const answers = items.map((item) => item.answer);

  const previewItems = items.map((item) => {
    let choices = item.choices || [];

    if (item.choiceGeneration === "random") {
      const otherAnswers = answers.filter((answer) => answer !== item.answer);

      const shuffledAnswers = [...otherAnswers].sort(() => Math.random() - 0.5);

      choices = [item.answer, ...shuffledAnswers.slice(0, 3)].sort(
        () => Math.random() - 0.5,
      );
    }

    return {
      question: item.question,
      answer: item.answer,
      choices,
      choiceGeneration: item.choiceGeneration || "disabled",
    };
  });

  return {
    subject: subject.trim(),
    quizName: quizName.trim(),
    numberOfItems: previewItems.length,
    items: previewItems,
  };
};

const createQuiz = async (userId, subject, quizName, items) => {
  if (!subject || !subject.trim()) {
    throw new AppError("Subject is required", 400);
  }

  if (!quizName || !quizName.trim()) {
    throw new AppError("Quiz name is required", 400);
  }

  if (!items || items.length < 4) {
    throw new AppError("Quiz must have at least 4 items", 400);
  }

  subject = subject.trim();
  quizName = quizName.trim();

  let subjectDocument = await Subject.findOne({
    userId,
    name: subject,
  });

  if (!subjectDocument) {
    subjectDocument = await Subject.create({
      userId,
      name: subject,
    });
  }

  const existingQuiz = await Quiz.findOne({
    userId,
    subjectId: subjectDocument._id,
    quizName,
  });

  if (existingQuiz) {
    throw new AppError(
      "Quiz with the same name already exists in this subject",
      400,
    );
  }

  for (const item of items) {
    if (!item.choices || item.choices.length !== 4) {
      throw new AppError("Each question must have exactly 4 choices", 400);
    }

    if (!item.choices.includes(item.answer)) {
      throw new AppError("The correct answer must be one of the choices", 400);
    }
  }

  const quiz = new Quiz({
    userId,
    subjectId: subjectDocument._id,
    quizName,
    items,
    numberOfItems: items.length,
  });

  await quiz.save();

  return quiz;
};

const getSubjects = async (userId, searchQuery, skipCount = 0) => {
  const filter = {
    userId,
  };

  if (searchQuery) {
    filter.name = {
      $regex: new RegExp(searchQuery, "i"),
    };
  }

  return Subject.find(filter)
    .sort({ name: 1 })
    .skip(parseInt(skipCount))
    .limit(10);
};

const getQuizzes = async (userId, subjectId, searchQuery, skipCount = 0) => {
  const filter = {
    userId,
    subjectId,
  };

  if (searchQuery) {
    filter.quizName = {
      $regex: new RegExp(searchQuery, "i"),
    };
  }

  return Quiz.find(filter)
    .select("subjectId quizName numberOfItems")
    .populate("subjectId", "name")
    .sort({ createdAt: -1 })
    .skip(parseInt(skipCount))
    .limit(10);
};

const getRecords = async (userId, searchQuery) => {
  const filter = {
    userId,
  };

  if (searchQuery) {
    filter.quizName = {
      $regex: new RegExp(searchQuery, "i"),
    };
  }

  const records = await Records.find(filter);

  return records.map((record) => ({
    _id: record._id,
    subject: record.subject,
    quizName: record.quizName,
    score: record.score,
    numberOfItems: record.numberOfItems,
    date: dateFormatter(record.createdAt),
  }));
};

const getRecord = async (recordId) => {
  const record = await Records.findById(recordId);

  if (!record) {
    throw new AppError("Quiz record not found", 404);
  }

  return {
    items: record.items,
    numberOfItems: record.numberOfItems,
    quizName: record.quizName,
    score: record.score,
    subject: record.subject,
    date: dateFormatter(record.createdAt),
  };
};

const saveData = async (userId, key, data, quizId) => {
  const savedData = await getSavedData(userId, key, quizId);

  if (savedData) {
    await AutoSave.findOneAndUpdate(
      {
        userId,
        key,
        quizId,
      },
      {
        data,
      },
    );
  } else {
    const saveData = new AutoSave({
      userId,
      key,
      data,
      quizId,
    });

    await saveData.save();
  }

  return {
    success: true,
    message: "data saved",
  };
};

const getSavedData = async (userId, key, quizId) => {
  return AutoSave.findOne({
    userId,
    key,
    quizId,
  });
};

const deleteSavedData = async (userId, key, quizId) => {
  await AutoSave.findOneAndDelete({
    userId,
    key,
    quizId,
  });

  return {
    success: true,
    message: "Saved data is successfully deleted",
  };
};

const getItems = async (quizId) => {
  const quiz = await Quiz.findById(quizId).populate("subjectId", "name");

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  return quiz;
};

const updateQuiz = async (quizId, userId, subject, quizName, items) => {
  const subjectDocument = await Subject.findOne({
    userId,
    name: subject,
  });

  if (!subjectDocument) {
    throw new AppError("Subject not found", 404);
  }

  const updatedQuiz = await Quiz.findByIdAndUpdate(
    quizId,
    {
      subjectId: subjectDocument._id,
      quizName,
      items,
      numberOfItems: items.length,
    },
    {
      new: true,
    },
  );

  if (!updatedQuiz) {
    throw new AppError("Quiz not found", 404);
  }

  return updatedQuiz;
};

const createPdf = async (quizId) => {
  const quiz = await Quiz.findById(quizId).populate("subjectId", "name");

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  const questions = quiz.items.map((quizItem) => ({
    question: quizItem.question,
    choices: generateRandomChoices(quizItem.answer, quiz.items),
    correctAns: quizItem.answer,
  }));

  const data = {
    _id: quizId,
    subject: quiz.subjectId.name,
    quizName: quiz.quizName,
    questions,
  };

  return savePDF(data);
};

const startQuiz = async (
  userId,
  quizId,
  quizType,
  randomizeQuestions = false,
) => {
  const quiz = await Quiz.findOne({
    _id: quizId,
    userId,
  });

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  if (!["enumeration", "multiple_choice"].includes(quizType)) {
    throw new AppError(
      "Quiz type must be either enumeration or multiple_choice",
      400,
    );
  }

  let session = await QuizSession.findOne({
    userId,
    quizId,
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

  const currentItemId = session.itemOrder[session.currentItem];

  const currentQuizItem = quiz.items.id(currentItemId);

  if (!currentQuizItem) {
    throw new AppError("Quiz item not found", 404);
  }

  return {
    sessionId: session._id,
    quizId: quiz._id,
    quizName: quiz.quizName,
    quizType: session.quizType,
    currentItem: session.currentItem,
    numberOfItems: quiz.numberOfItems,
    question: currentQuizItem.question,
    choices:
      session.quizType === "multiple_choice"
        ? currentQuizItem.choices
        : undefined,
    score: session.score,
    answeredItems: session.answeredItems,
    status: session.status,
    randomizeQuestions: session.randomizeQuestions,
  };
};

const submitAnswer = async (userId, sessionId, answer) => {
  const session = await QuizSession.findOne({
    _id: sessionId,
    userId,
  });

  if (!session) {
    throw new AppError("Quiz session not found", 404);
  }

  if (session.status !== "in_progress") {
    throw new AppError("Quiz session is not in progress", 400);
  }

  const quiz = await Quiz.findOne({
    _id: session.quizId,
    userId,
  });

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  const currentItemId = session.itemOrder[session.currentItem];

  const currentQuizItem = quiz.items.id(currentItemId);

  if (!currentQuizItem) {
    throw new AppError("Quiz item not found", 404);
  }

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

  return {
    correct: isCorrect,
    correctAnswer: currentQuizItem.answer,
    score: session.score,
    answeredItems: session.answeredItems,
    currentItem: session.currentItem,
    numberOfItems: quiz.numberOfItems,
    status: session.status,
  };
};

const nextQuestion = async (userId, sessionId) => {
  const session = await QuizSession.findOne({
    _id: sessionId,
    userId,
  });

  if (!session) {
    throw new AppError("Quiz session not found", 404);
  }

  if (session.status === "completed") {
    throw new AppError("Quiz has already been completed", 400);
  }

  const quiz = await Quiz.findOne({
    _id: session.quizId,
    userId,
  });

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  const currentItemId = session.itemOrder[session.currentItem];

  const currentQuizItem = quiz.items.id(currentItemId);

  if (!currentQuizItem) {
    throw new AppError("Quiz item not found", 404);
  }

  return {
    sessionId: session._id,
    quizId: quiz._id,
    quizName: quiz.quizName,
    quizType: session.quizType,
    currentItem: session.currentItem,
    numberOfItems: quiz.numberOfItems,
    question: currentQuizItem.question,
    choices:
      session.quizType === "multiple_choice"
        ? currentQuizItem.choices
        : undefined,
    score: session.score,
    answeredItems: session.answeredItems,
    status: session.status,
  };
};

module.exports = {
  previewQuiz,
  createQuiz,
  getSubjects,
  getQuizzes,
  getRecords,
  getRecord,
  saveData,
  getSavedData,
  deleteSavedData,
  getItems,
  updateQuiz,
  startQuiz,
  submitAnswer,
  nextQuestion,
  createPdf,
};
