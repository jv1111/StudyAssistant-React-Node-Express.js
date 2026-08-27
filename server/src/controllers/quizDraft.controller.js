const quizDraftService = require("../services/quizDraft.service");

const asyncHandler = require("../utils/asyncHandler");

const { successResponse } = require("../utils/response");

const getDraft = asyncHandler(async (req, res) => {
  const draft = await quizDraftService.getDraft(req.user._id);

  successResponse(res, 200, draft);
});

const saveDraft = asyncHandler(async (req, res) => {
  const { subject, quizName, items } = req.body;

  const draft = await quizDraftService.saveDraft(
    req.user._id,
    subject,
    quizName,
    items,
  );

  successResponse(res, 200, draft);
});

const deleteDraft = asyncHandler(async (req, res) => {
  const draft = await quizDraftService.deleteDraft(req.user._id);

  successResponse(res, 200, draft);
});

module.exports = {
  getDraft,
  saveDraft,
  deleteDraft,
};
