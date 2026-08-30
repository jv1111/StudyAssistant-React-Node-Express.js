const quizRecordService = require("../services/quizRecord.service");

const asyncHandler = require("../utils/asyncHandler");

const { successResponse } = require("../utils/response");

const saveRecord = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  const record = await quizRecordService.saveRecord(req.user._id, sessionId);

  successResponse(res, 201, record);
});

const getRecords = asyncHandler(async (req, res) => {
  const { searchQuery, skipCount } = req.query;

  const records = await quizRecordService.getRecords(
    req.user._id,
    searchQuery,
    skipCount,
  );

  successResponse(res, 200, records);
});

const getRecordByRecordId = asyncHandler(async (req, res) => {
  const { recordId } = req.query;

  const record = await quizRecordService.getRecordByRecordId(
    req.user._id,
    recordId,
  );

  successResponse(res, 200, record);
});

module.exports = {
  saveRecord,
  getRecords,
  getRecordByRecordId,
};
