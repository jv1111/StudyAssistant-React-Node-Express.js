const Quiz = require("../models/quiz.model");
const Subject = require("../models/subject.model");
const Records = require("../models/records.model");

const dateFormatter = require("../utils/dateFormatter");
const { savePDF } = require("../utils/pdfHandler");

const AppError = require("../utils/AppError");

const previewQuiz = async (subject, quizName, items) => {
  validateQuizInput(subject, quizName, items);

  const answers = items.map((item) => item.answer);

  const previewItems = items.map((item) => {
    let choices = item.choices || [];
    const generationMethod = item.generationMethod || "random";

    if (generationMethod === "random") {
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
      generationMethod,
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
  validateQuizInput(subject, quizName, items);
  validateQuizChoices(items);

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

const getItems = async (quizId) => {
  const quiz = await Quiz.findById(quizId).populate("subjectId", "name");

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  return quiz;
};

const updateQuiz = async (quizId, userId, subject, quizName, items) => {
  validateQuizInput(subject, quizName, items);
  validateQuizChoices(items);

  const subjectDocument = await Subject.findOne({
    userId,
    name: subject.trim(),
  });

  if (!subjectDocument) {
    throw new AppError("Subject not found", 404);
  }

  const updatedQuiz = await Quiz.findOneAndUpdate(
    {
      _id: quizId,
      userId,
    },
    {
      subjectId: subjectDocument._id,
      quizName: quizName.trim(),
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

const validateQuizInput = (subject, quizName, items) => {
  if (!subject || !subject.trim()) {
    throw new AppError("Subject is required", 400);
  }

  if (!quizName || !quizName.trim()) {
    throw new AppError("Quiz name is required", 400);
  }

  if (!items || items.length < 4) {
    throw new AppError("Quiz must have at least 4 items", 400);
  }
};

const validateQuizChoices = (items) => {
  for (const item of items) {
    if (!item.choices || item.choices.length !== 4) {
      throw new AppError("Each question must have exactly 4 choices", 400);
    }

    if (!item.choices.includes(item.answer)) {
      throw new AppError("The correct answer must be one of the choices", 400);
    }
  }
};

module.exports = {
  previewQuiz,
  createQuiz,
  getSubjects,
  getQuizzes,
  getRecords,
  getRecord,
  getItems,
  updateQuiz,
  createPdf,
};
