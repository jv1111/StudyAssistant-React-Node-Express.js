const { GoogleGenAI } = require("@google/genai");
const env = require("../config/env");

const ai = new GoogleGenAI({ apiKey: env.geminiApiKey });

const generateQuizContent = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  return response.text;
};

module.exports = {
  generateQuizContent,
};
