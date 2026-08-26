const path = require("path");

const quizService = require("../services/quiz.service");

const { fileDelete } = require("../utils/pdfHandler");

const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const {
  createRecordResponse,
  createQuizResponse,
} = require("../utils/responseFormatters/quizResponse");

const previewQuiz = asyncHandler(async (req, res) => {
  const { subject, quizName, items } = req.body;

  const preview = await quizService.previewQuiz(subject, quizName, items);

  successResponse(res, 200, preview);
});

const createQuiz = asyncHandler(async (req, res) => {
  const { subject, quizName, items } = req.body;

  const quiz = await quizService.createQuiz(
    req.user._id,
    subject,
    quizName,
    items,
  );

  successResponse(res, 201, createQuizResponse(quiz));
});

const getSubjects = asyncHandler(async (req, res) => {
  const { searchQuery, skipCount } = req.query;

  const subjects = await quizService.getSubjects(
    req.user._id,
    searchQuery,
    skipCount,
  );

  successResponse(res, 200, subjects);
});

const getQuizzes = asyncHandler(async (req, res) => {
  const { subjectId, searchQuery, skipCount } = req.query;

  const quizzes = await quizService.getQuizzes(
    req.user._id,
    subjectId,
    searchQuery,
    skipCount,
  );

  successResponse(res, 200, quizzes);
});

const saveQuizRecord = asyncHandler(async (req, res) => {
  const { quizId } = req.body;

  const record = await quizService.saveRecordQuizResult(quizId, req.user._id);

  successResponse(res, 201, createRecordResponse(record));
});

const getQuizRecords = asyncHandler(async (req, res) => {
  const { searchQuery } = req.query;

  const records = await quizService.getRecords(req.user._id, searchQuery);

  successResponse(res, 200, records.map(createRecordResponse));
});

const getQuizRecord = asyncHandler(async (req, res) => {
  const { recordId } = req.query;

  const record = await quizService.getRecord(recordId);

  successResponse(res, 200, record);
});

const saveData = asyncHandler(async (req, res) => {
  const { key, data, quizId } = req.body;

  const result = await quizService.saveData(req.user._id, key, data, quizId);

  successResponse(res, 201, result);
});

const getSavedData = asyncHandler(async (req, res) => {
  const { key, quizId } = req.query;

  const savedData = await quizService.getSavedData(req.user._id, key, quizId);

  successResponse(res, 200, savedData);
});

const deleteSavedData = asyncHandler(async (req, res) => {
  const { key, quizId } = req.query;

  const result = await quizService.deleteSavedData(req.user._id, key, quizId);

  successResponse(res, 200, result);
});

const getItems = asyncHandler(async (req, res) => {
  const { quizId } = req.query;

  const result = await quizService.getItems(quizId);

  successResponse(res, 200, result);
});

const updateQuiz = asyncHandler(async (req, res) => {
  const { quizId, subject, quizName, items } = req.body;

  const result = await quizService.updateQuiz(
    quizId,
    req.user._id,
    subject,
    quizName,
    items,
  );

  successResponse(res, 200, createQuizResponse(result));
});

const createPdf = asyncHandler(async (req, res) => {
  const { quizId } = req.body;

  const result = await quizService.createPdf(quizId);

  successResponse(res, 200, result);
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
    return errorResponse(res, 400, "filePath is required");
  }

  const result = await fileDelete(filePath);

  successResponse(res, 200, result);
});

module.exports = {
  createQuiz,
  getSubjects,
  getQuizzes,
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
  previewQuiz,
};
