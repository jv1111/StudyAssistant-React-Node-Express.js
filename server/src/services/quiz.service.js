const mongoose = require("mongoose");
const QuizModel = require("../models/QuizModel");
const QuizSessionModel = require("../models/QuizSessionModel");
const RecordsModel = require("../models/RecordsModel");
const AutoSaveModel = require("../models/AutoSaveModel");
const dateFormatter = require("../utils/dateFormatter");
const { savePDF } = require("../utils/pdfHandler");

const AppError = require("../utils/AppError");

const createQuiz = async (userId, subject, quizName, items) => {
  const quiz = new QuizModel({
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

  const subjects = await QuizModel.aggregate()
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

  // const quiz = await QuizModel.find(filter).select("subject quizName numberOfItems");//select only subject and quizName
  const quiz = await QuizModel.aggregate()
    .match(filter)
    .project({ subject: 1, quizName: 1, numberOfItems: 1 }) //get only specific field
    .sort({ _id: 1 }) //sort accending
    .skip(parseInt(skipCount)) // number of items to skip starting from index 0
    .limit(10); //number of data to get

  return quiz;
};

const startQuiz = async (userId, quizId) => {
  let session = await QuizSessionModel.find({
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
  const quiz = await QuizModel.findById(quizId);

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

  return QuizSessionModel.insertMany(sessionData);
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
  let choices = [];
  let correctAnsIndex = Math.floor(Math.random() * 3);
  let pushCount = 0;
  const maxLoopPerChoice = 500;
  let loopCountPerChoice = 0; //loop count per choice
  while (pushCount < 3) {
    // push the correct answer base on the random index(correctAnsIndex)
    if (pushCount === correctAnsIndex) {
      choices.push(correctAnswer);
      pushCount++;
      continue;
    }
    const randomIndexOfAllItems = Math.floor(Math.random() * allItems.length);
    const incorrectAnsToAdd = allItems[randomIndexOfAllItems].answer;
    // push incorrect answers and prevent duplicate
    if (
      incorrectAnsToAdd !== correctAnswer &&
      !choices.includes(incorrectAnsToAdd)
    ) {
      choices.push(incorrectAnsToAdd);
      pushCount++;
    } else if (maxLoopPerChoice === loopCountPerChoice) {
      choices.push(null);
      pushCount++;
      loopCountPerChoice = 0;
    }
    loopCountPerChoice++;
  }
  return choices;
};

const submitAnswer = async (questionId, answer) => {
  const sessionItem = await QuizSessionModel.findById(questionId);

  if (!sessionItem) {
    throw new AppError("Quiz question not found", 404);
  }

  if (!answer) {
    throw new AppError("Answer is required", 400);
  }

  const isCorrect = sessionItem.answer.toLowerCase() === answer.toLowerCase();

  await QuizSessionModel.findByIdAndUpdate(questionId, {
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
  const quizSession = await QuizSessionModel.find({
    quizId,
    userId,
  });

  if (quizSession.length === 0) {
    throw new AppError("Quiz session not found", 404);
  }

  const record = new RecordsModel({
    userId,
    subject: quizSession[0].subject,
    quizName: quizSession[0].quizName,
    score: getScore(quizSession),
    numberOfItems: quizSession.length,
    items: quizSession,
  });

  await record.save();

  await QuizSessionModel.deleteMany({
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

  const records = await RecordsModel.find(filter);

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
  const record = await RecordsModel.findById(recordId);

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
    await AutoSaveModel.findOneAndUpdate(
      { userId: userId, key: key, quizId: quizId },
      { data: data },
    );
  } else {
    // create new data
    const saveData = new AutoSaveModel({
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
  return AutoSaveModel.findOne({
    userId,
    key,
    quizId,
  });
};

const deleteSavedData = async (userId, key, quizId) => {
  await AutoSaveModel.findOneAndDelete({
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
  const quiz = await QuizModel.findById(quizId);

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  return quiz;
};

const updateQuiz = async (quizId, subject, quizName, items) => {
  const updatedQuiz = await QuizModel.findByIdAndUpdate(
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
  const quiz = await QuizModel.findById(quizId);

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
