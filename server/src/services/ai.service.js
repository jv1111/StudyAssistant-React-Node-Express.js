const { GoogleGenAI } = require("@google/genai");

const env = require("../config/env");
const AppError = require("../utils/AppError");

const ai = new GoogleGenAI({
  apiKey: env.geminiApiKey,
});

const generateQuizContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("AI generation failed:", error);

    throw new AppError(
      "We couldn't generate content using AI. Your AI usage limit may have been reached. If so, please try again tomorrow. Otherwise, the AI service may be temporarily unavailable or under maintenance.",
      503,
      "AI_GENERATION_FAILED",
    );
  }
};

module.exports = {
  generateQuizContent,
};
