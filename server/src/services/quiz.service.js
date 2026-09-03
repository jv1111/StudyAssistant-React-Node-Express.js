const fs = require("fs");
const path = require("path");

const Quiz = require("../models/quiz.model");
const Subject = require("../models/subject.model");

const sampleQuizzes = require("../data/sampleQuiz");
const { generateQuizContent } = require("./ai.service");

const { savePDF } = require("../utils/pdfHandler");
const { getPagination } = require("../utils/pagination");

const AppError = require("../utils/AppError");

const quizChoicesPrompt = fs.readFileSync(
  path.join(__dirname, "../prompts/quizChoices.prompt.txt"),
  "utf-8",
);

const previewQuiz = async (subject, quizName, items) => {
  validateQuizInput(subject, quizName, items);

  const answers = items.map((item) => item.answer);

  const aiItems = getAIItems(items);

  let aiChoices = [];

  if (aiItems.length > 0) {
    const aiPrompt = buildAIChoicesPrompt(aiItems);
    const aiResponse = await generateQuizContent(aiPrompt);

    try {
      aiChoices = JSON.parse(aiResponse);
    } catch (error) {
      console.error("Failed to parse AI response:", error);

      throw new AppError(
        "AI returned an invalid response.",
        503,
        "AI_INVALID_RESPONSE",
      );
    }
  }

  const previewItems = items.map((item, index) => {
    if (item.generationMethod === "ai") {
      const aiItem = aiChoices.find((choice) => choice.index === index);

      return {
        question: item.question,
        answer: item.answer,
        choices: aiItem?.choices || [],
        generationMethod: "ai",
      };
    }

    return buildPreviewItem(item, answers);
  });

  return {
    subject: subject.trim(),
    quizName: quizName.trim(),
    numberOfItems: previewItems.length,
    items: previewItems,
  };
};

const getAIItems = (items) => {
  return items
    .map((item, index) => {
      if (item.generationMethod !== "ai") {
        return null;
      }

      return {
        index,
        question: item.question,
        answer: item.answer,
      };
    })
    .filter(Boolean);
};

const buildAIChoicesPrompt = (aiItems) => {
  return quizChoicesPrompt.replace(
    "{{AI_ITEMS}}",
    JSON.stringify(aiItems, null, 2),
  );
};

const generateRandomChoices = (item, answers) => {
  const otherAnswers = answers.filter((answer) => answer !== item.answer);

  const shuffledAnswers = shuffleArray(otherAnswers);

  let choices = [item.answer, ...shuffledAnswers.slice(0, 3)];

  while (choices.length < 4) {
    choices.push(`Option ${choices.length + 1}`);
  }

  return shuffleArray(choices);
};

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
};

const buildPreviewItem = (item, answers) => {
  const generationMethod = item.generationMethod || "random";

  let choices = item.choices || [];

  if (generationMethod === "random") {
    choices = generateRandomChoices(item, answers);
  }

  return {
    question: item.question,
    answer: item.answer,
    choices,
    generationMethod,
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

const createManyQuizzes = async (userId, subjects) => {
  if (!Array.isArray(subjects) || subjects.length === 0) {
    throw new AppError("At least one subject is required", 400);
  }

  const quizDocuments = [];

  for (const subjectData of subjects) {
    const { subject, quizzes } = subjectData;

    if (!subject || !subject.trim()) {
      throw new AppError("Subject is required", 400);
    }

    if (!Array.isArray(quizzes) || quizzes.length === 0) {
      throw new AppError(
        `At least one quiz is required for subject "${subject}"`,
        400,
      );
    }

    const subjectName = subject.trim();

    let subjectDocument = await Subject.findOne({
      userId,
      name: subjectName,
    });

    if (!subjectDocument) {
      subjectDocument = await Subject.create({
        userId,
        name: subjectName,
      });
    }

    const quizNames = quizzes.map((quiz) => quiz.quizName?.trim());

    for (const quiz of quizzes) {
      validateQuizInput(subjectName, quiz.quizName, quiz.items);
      validateQuizChoices(quiz.items);
    }

    const uniqueQuizNames = new Set(quizNames);

    if (uniqueQuizNames.size !== quizNames.length) {
      throw new AppError(
        `Quiz names must be unique within subject "${subjectName}"`,
        400,
      );
    }

    const existingQuizzes = await Quiz.find({
      userId,
      subjectId: subjectDocument._id,
      quizName: { $in: quizNames },
    }).select("quizName");

    if (existingQuizzes.length > 0) {
      throw new AppError(
        `Quiz with the same name already exists in "${subjectName}": ${existingQuizzes
          .map((quiz) => quiz.quizName)
          .join(", ")}`,
        400,
      );
    }

    quizDocuments.push(
      ...quizzes.map((quiz) => ({
        userId,
        subjectId: subjectDocument._id,
        quizName: quiz.quizName.trim(),
        items: quiz.items,
        numberOfItems: quiz.items.length,
      })),
    );
  }

  return Quiz.insertMany(quizDocuments);
};

const createSampleQuiz = async (userId) => {
  return createManyQuizzes(userId, sampleQuizzes);
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

  const { skip, limit } = getPagination(skipCount);

  return Subject.find(filter).sort({ name: 1 }).skip(skip).limit(limit);
};

const getQuiz = async (userId, quizId) => {
  const quiz = await Quiz.findOne({
    _id: quizId,
    userId,
  }).populate("subjectId", "name");

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  return quiz;
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

  const { skip, limit } = getPagination(skipCount);

  return Quiz.find(filter)
    .select("subjectId quizName numberOfItems")
    .populate("subjectId", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

const getQuizById = async (userId, quizId) => {
  const quiz = await Quiz.findOne({
    _id: quizId,
    userId,
  }).populate("subjectId", "name");

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  return quiz;
};

const getItems = async (userId, quizId) => {
  const quiz = await Quiz.findOne({
    _id: quizId,
    userId,
  }).populate("subjectId", "name");

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

const deleteSubject = async (userId, subjectId) => {
  const subject = await Subject.findOne({
    _id: subjectId,
    userId,
  });

  if (!subject) {
    throw new AppError("Subject not found", 404);
  }

  await Quiz.deleteMany({
    userId,
    subjectId,
  });

  await Subject.deleteOne({
    _id: subjectId,
    userId,
  });

  return {
    message: "Subject deleted successfully",
  };
};

const deleteAllSubjects = async (userId) => {
  await Quiz.deleteMany({
    userId,
  });

  await Subject.deleteMany({
    userId,
  });

  return {
    message: "All subjects deleted successfully",
  };
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

const downloadPdf = async (userId, quizId) => {
  const quiz = await Quiz.findOne({
    _id: quizId,
    userId,
  }).populate("subjectId", "name");

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  const questions = quiz.items.map((quizItem) => ({
    question: quizItem.question,
    choices: quizItem.choices,
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

module.exports = {
  previewQuiz,
  createQuiz,
  createManyQuizzes,
  createSampleQuiz,
  getSubjects,
  getQuiz,
  getQuizzes,
  getQuizById,
  getItems,
  updateQuiz,
  deleteSubject,
  deleteAllSubjects,
  downloadPdf,
};
