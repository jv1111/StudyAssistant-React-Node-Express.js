const mongoose = require("mongoose");

const Quiz = require("../models/quiz.model");
const QuizSession = require("../models/quizSession.model");

const Records = require("../models/records.model");
const AutoSave = require("../models/autoSave.model");

const dateFormatter = require("../utils/dateFormatter");
const { savePDF } = require("../utils/pdfHandler");

const AppError = require("../utils/AppError");

const createQuiz = async (userId, subject, quizName, items) => {
  const quiz = new Quiz({
    userId: userId,
    subject: subject,
    quizName: quizName,
    items: items,
    numberOfItems: items.length,
  });
  await quiz.save();
  return quiz;
};

const getSubjects = async (userId, searchQuery, skipCount) => {
  let filter = { userId: new mongoose.Types.ObjectId(userId) }; //return all subjects with userId:userId

  // generate new filter if there is a search query
  if (searchQuery) filter.subject = { $regex: new RegExp(searchQuery, "i") };

  if (!skipCount) skipCount = 0;

  const subjects = await Quiz.aggregate()
    .match(filter)
    .group({ _id: "$subject" })
    .sort({ _id: 1 }) //sort accending
    .skip(parseInt(skipCount)) // number of items to skip starting from index 0
    .limit(10); //number of data to get
  return subjects;
};

const getQuizzes = async (userId, subject, searchQuery, skipCount) => {
  let filter = {
    userId: new mongoose.Types.ObjectId(userId),
    subject: subject,
  };

  if (!skipCount) skipCount = 0;

  if (searchQuery) filter.quizName = { $regex: new RegExp(searchQuery, "i") };

  // const quiz = await Quiz.find(filter).select("subject quizName numberOfItems");//select only subject and quizName
  const quiz = await Quiz.aggregate()
    .match(filter)
    .project({ subject: 1, quizName: 1, numberOfItems: 1 }) //get only specific field
    .sort({ _id: 1 }) //sort accending
    .skip(parseInt(skipCount)) // number of items to skip starting from index 0
    .limit(10); //number of data to get

  return quiz;
};

const startQuiz = async (userId, quizId) => {
  let session = await QuizSession.find({
    userId,
    quizId,
  });

  if (session.length === 0) {
    session = await createQuizSession(userId, quizId);
  }

  const unansweredItems = session.filter((item) => !item.answered);

  if (unansweredItems.length === 0) {
    throw new AppError("Quiz has already been completed", 400);
  }

  const randomItem = getRandomItem(unansweredItems);
  const score = getScore(session);
  const choices = generateRandomChoices(randomItem.answer, session);
  const questionNumber = session.length - unansweredItems.length + 1;

  return {
    _id: randomItem._id,
    subject: randomItem.subject,
    quizName: randomItem.quizName,
    question: randomItem.question,
    score,
    choices,
    questionNumber,
    numberOfItems: session.length,
  };
};

const createQuizSession = async (userId, quizId) => {
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  const sessionData = quiz.items.map((quizItem) => ({
    userId,
    quizId,
    subject: quiz.subject,
    quizName: quiz.quizName,
    question: quizItem.question,
    answer: quizItem.answer,
  }));

  return QuizSession.insertMany(sessionData);
};

const getRandomItem = (unansweredItems) => {
  const randomIndex = Math.floor(Math.random() * unansweredItems.length);
  const randomItem = unansweredItems[randomIndex];
  return randomItem;
};

const getScore = (session) => {
  let score = 0;
  session.forEach((item) => {
    if (item.correct) {
      score++;
    }
  });
  return score;
};

const generateRandomChoices = (correctAnswer, allItems) => {
  const choices = [correctAnswer];

  const incorrectAnswers = [
    ...new Set(
      allItems
        .map((item) => item.answer)
        .filter(
          (answer) => answer !== correctAnswer && !choices.includes(answer),
        ),
    ),
  ];

  while (choices.length < 4 && incorrectAnswers.length > 0) {
    const randomIndex = Math.floor(Math.random() * incorrectAnswers.length);

    choices.push(incorrectAnswers[randomIndex]);
    incorrectAnswers.splice(randomIndex, 1);
  }

  // Randomize the position of the correct answer
  return choices.sort(() => Math.random() - 0.5);
};

const submitAnswer = async (questionId, answer) => {
  const sessionItem = await QuizSession.findById(questionId);

  if (!sessionItem) {
    throw new AppError("Quiz question not found", 404);
  }

  if (!answer) {
    throw new AppError("Answer is required", 400);
  }

  const isCorrect = sessionItem.answer.toLowerCase() === answer.toLowerCase();

  await QuizSession.findByIdAndUpdate(questionId, {
    userAnswer: answer,
    answered: true,
    correct: isCorrect,
  });

  return {
    correctAns: sessionItem.answer,
    correct: isCorrect,
  };
};

const saveRecordQuizResult = async (quizId, userId) => {
  const quizSession = await QuizSession.find({
    quizId,
    userId,
  });

  if (quizSession.length === 0) {
    throw new AppError("Quiz session not found", 404);
  }

  const record = new Records({
    userId,
    subject: quizSession[0].subject,
    quizName: quizSession[0].quizName,
    score: getScore(quizSession),
    numberOfItems: quizSession.length,
    items: quizSession,
  });

  await record.save();

  await QuizSession.deleteMany({
    quizId,
    userId,
  });

  return record;
};

const getRecords = async (userId, searchQuery) => {
  const filter = { userId };

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
    // update the data if there is an existing data
    await AutoSave.findOneAndUpdate(
      { userId: userId, key: key, quizId: quizId },
      { data: data },
    );
  } else {
    // create new data
    const saveData = new AutoSave({
      userId: userId,
      key: key,
      data: data,
      quizId: quizId,
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
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  return quiz;
};

const updateQuiz = async (quizId, subject, quizName, items) => {
  const updatedQuiz = await Quiz.findByIdAndUpdate(
    quizId,
    {
      subject,
      quizName,
      items,
      numberOfItems: items.length,
    },
    { new: true },
  );

  if (!updatedQuiz) {
    throw new AppError("Quiz not found", 404);
  }

  return updatedQuiz;
};

const createPdf = async (quizId) => {
  const quiz = await Quiz.findById(quizId);

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
    subject: quiz.subject,
    quizName: quiz.quizName,
    questions,
  };

  return savePDF(data);
};

module.exports = {
  createPdf,
  createQuiz,
  getSubjects,
  getQuizzes,
  startQuiz,
  submitAnswer,
  getScore,
  saveRecordQuizResult,
  getRecords,
  getRecord,
  saveData,
  getSavedData,
  deleteSavedData,
  getItems,
  updateQuiz,
};
