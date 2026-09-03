const quizService = require("../services/quiz.service");

const asyncHandler = require("../utils/asyncHandler");
const { fileDelete } = require("../utils/pdfHandler");
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

const createManyQuizzes = asyncHandler(async (req, res) => {
  const { subjects } = req.body;

  const createdQuizzes = await quizService.createManyQuizzes(
    req.user._id,
    subjects,
  );

  successResponse(res, 201, createdQuizzes.map(createQuizResponse));
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

const getQuizById = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  const quiz = await quizService.getQuizById(req.user._id, quizId);

  successResponse(res, 200, quiz);
});

const getItems = asyncHandler(async (req, res) => {
  const { quizId } = req.query;

  const result = await quizService.getItems(req.user._id, quizId);

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

const deleteSubject = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;

  const result = await quizService.deleteSubject(req.user._id, subjectId);

  successResponse(res, 200, result);
});

const deleteAllSubjects = asyncHandler(async (req, res) => {
  const result = await quizService.deleteAllSubjects(req.user._id);

  successResponse(res, 200, result);
});

const downloadPdf = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  const pdf = await quizService.downloadPdf(req.user._id, quizId);

  res.download(pdf.path, pdf.pdfName, async (error) => {
    if (error) {
      throw error;
    }

    await fileDelete(pdf.path);
  });
});

module.exports = {
  createQuiz,
  createManyQuizzes,
  getSubjects,
  getQuizzes,
  saveData,
  getSavedData,
  deleteSavedData,
  getQuizById,
  getItems,
  updateQuiz,
  deleteSubject,
  deleteAllSubjects,
  previewQuiz,
  downloadPdf,
};
