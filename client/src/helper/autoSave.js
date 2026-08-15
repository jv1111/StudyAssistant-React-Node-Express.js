import { saveData } from "../api/QuizApi";
let timeoutId;

const autoSave = (key, data, quizId) => {
  // Clear the previous save timeout
  clearTimeout(timeoutId);

  const newTimeout = setTimeout(() => {
    // save function here
    saveData(key, data, quizId);
  }, 1000);
  timeoutId = newTimeout;
};

export default autoSave;
