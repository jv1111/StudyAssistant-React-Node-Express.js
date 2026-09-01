const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");
const aiService = require("../services/ai.service");
const { successResponse } = require("../utils/response.js");

const generateContent = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    throw new AppError("Prompt is required", 400);
  }

  const aiOutput = await aiService.generateQuizContent(prompt);

  successResponse(res, 200, {
    message: "Content generated successfully",
    result: aiOutput,
  });
});

module.exports = {
  generateContent,
};
