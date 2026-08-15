const path = require("path");

const quizService = require("../services/quiz.service");
const { fileDelete } = require("../utils/pdfHandler");
const asyncHandler = require("../utils/asyncHandler");

const createQuiz = asyncHandler(async (req, res) => {
  const { subject, quizName, items } = req.body;

  const quiz = await quizService.createQuiz(
    req.user._id,
    subject,
    quizName,
    items,
  );

  res.status(201).json(quiz);
});

const getSubjects = asyncHandler(async (req, res) => {
  const { searchQuery, skipCount } = req.query;

  const subjects = await quizService.getSubjects(
    req.user._id,
    searchQuery,
    skipCount,
  );

  res.status(200).json(subjects);
});

const getQuizzes = asyncHandler(async (req, res) => {
  const { subject, searchQuery, skipCount } = req.query;

  const quizzes = await quizService.getQuizzes(
    req.user._id,
    subject,
    searchQuery,
    skipCount,
  );

  res.status(200).json(quizzes);
});

const startQuiz = asyncHandler(async (req, res) => {
  const { quizId } = req.query;

  const quizItem = await quizService.startQuiz(req.user._id, quizId);

  res.status(200).json(quizItem);
});

const submitAnswer = asyncHandler(async (req, res) => {
  const { questionId, answer } = req.body;

  const result = await quizService.submitAnswer(questionId, answer);

  res.status(200).json(result);
});

const saveQuizRecord = asyncHandler(async (req, res) => {
  const { quizId } = req.body;

  const record = await quizService.saveRecordQuizResult(quizId, req.user._id);

  res.status(201).json(record);
});

const getQuizRecords = asyncHandler(async (req, res) => {
  const { searchQuery } = req.query;

  const records = await quizService.getRecords(req.user._id, searchQuery);

  res.status(200).json(records);
});

const getQuizRecord = asyncHandler(async (req, res) => {
  const { recordId } = req.query;

  const record = await quizService.getRecord(recordId);

  res.status(200).json(record);
});

const saveData = asyncHandler(async (req, res) => {
  const { key, data, quizId } = req.body;

  const result = await quizService.saveData(req.user._id, key, data, quizId);

  res.status(201).json(result);
});

const getSavedData = asyncHandler(async (req, res) => {
  const { key, quizId } = req.query;

  const savedData = await quizService.getSavedData(req.user._id, key, quizId);

  res.status(200).json(savedData);
});

const deleteSavedData = asyncHandler(async (req, res) => {
  const { key, quizId } = req.query;

  const result = await quizService.deleteSavedData(req.user._id, key, quizId);

  res.status(200).json(result);
});

const getItems = asyncHandler(async (req, res) => {
  const { quizId } = req.query;

  const result = await quizService.getItems(quizId);

  res.status(200).json(result);
});

const updateQuiz = asyncHandler(async (req, res) => {
  const { quizId, subject, quizName, items } = req.body;

  const result = await quizService.updateQuiz(quizId, subject, quizName, items);

  res.status(200).json(result);
});

const createPdf = asyncHandler(async (req, res) => {
  const { quizId } = req.body;

  const result = await quizService.createPdf(quizId);

  res.status(200).json(result);
});

const getPdf = asyncHandler(async (req, res) => {
  const { pdfId } = req.query;

  const projectRoot = path.resolve(__dirname, "../..");
  const pdfDirectory = path.join(projectRoot, "public", "pdf");
  const filePath = path.join(pdfDirectory, pdfId);

  res.sendFile(filePath);
});

const deleteFile = asyncHandler(async (req, res) => {
  const { filePath } = req.query;

  if (!filePath) {
    return res.status(400).json({
      success: false,
      error: "filePath is required",
    });
  }

  const result = await fileDelete(filePath);

  res.status(200).json(result);
});

module.exports = {
  createQuiz,
  getSubjects,
  getQuizzes,
  startQuiz,
  submitAnswer,
  saveQuizRecord,
  getQuizRecords,
  getQuizRecord,
  saveData,
  getSavedData,
  deleteSavedData,
  getItems,
  updateQuiz,
  createPdf,
  getPdf,
  deleteFile,
};
