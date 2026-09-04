const quizRecordService = require("../services/quizRecord.service");

const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");

const saveRecord = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  const record = await quizRecordService.saveRecord(req.user._id, sessionId);

  successResponse(res, 201, record);
});

const getRecordedSubjects = asyncHandler(async (req, res) => {
  const { searchQuery, skipCount } = req.query;

  const subjects = await quizRecordService.getRecordedSubjects(
    req.user._id,
    searchQuery,
    skipCount,
  );

  successResponse(res, 200, subjects);
});

const getRecordsBySubject = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;
  const { searchQuery, skipCount } = req.query;

  const records = await quizRecordService.getRecordsBySubject(
    req.user._id,
    subjectId,
    searchQuery,
    skipCount,
  );

  successResponse(res, 200, records);
});

const getRecordByRecordId = asyncHandler(async (req, res) => {
  const { recordId } = req.params;

  const record = await quizRecordService.getRecordByRecordId(
    req.user._id,
    recordId,
  );

  successResponse(res, 200, record);
});

module.exports = {
  saveRecord,
  getRecordedSubjects,
  getRecordsBySubject,
  getRecordByRecordId,
};
