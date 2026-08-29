const quizDraftService = require("../services/quizDraft.service");

const asyncHandler = require("../utils/asyncHandler");

const { successResponse } = require("../utils/response");

const getCreateQuizDraft = asyncHandler(async (req, res) => {
  const draft = await quizDraftService.getCreateQuizDraft(req.user._id);

  successResponse(res, 200, draft);
});

const saveCreateQuizDraft = asyncHandler(async (req, res) => {
  const { isPreview, subject, quizName, items } = req.body;

  const draft = await quizDraftService.saveCreateQuizDraft(
    req.user._id,
    isPreview,
    subject,
    quizName,
    items,
  );

  successResponse(res, 200, draft);
});

const deleteCreateQuizDraft = asyncHandler(async (req, res) => {
  const draft = await quizDraftService.deleteCreateQuizDraft(req.user._id);

  successResponse(res, 200, draft);
});

const getUpdateQuizDraft = asyncHandler(async (req, res) => {
  const { quizId } = req.query;

  const draft = await quizDraftService.getUpdateQuizDraft(req.user._id, quizId);

  successResponse(res, 200, draft);
});

const saveUpdateQuizDraft = asyncHandler(async (req, res) => {
  const { quizId, subject, quizName, items } = req.body;

  const draft = await quizDraftService.saveUpdateQuizDraft(
    req.user._id,
    quizId,
    subject,
    quizName,
    items,
  );

  successResponse(res, 200, draft);
});

const deleteUpdateQuizDraft = asyncHandler(async (req, res) => {
  const { quizId } = req.query;

  const draft = await quizDraftService.deleteUpdateQuizDraft(
    req.user._id,
    quizId,
  );

  successResponse(res, 200, draft);
});

module.exports = {
  getCreateQuizDraft,
  saveCreateQuizDraft,
  deleteCreateQuizDraft,

  getUpdateQuizDraft,
  saveUpdateQuizDraft,
  deleteUpdateQuizDraft,
};
