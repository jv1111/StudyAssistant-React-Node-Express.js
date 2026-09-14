import { saveData } from "../api/quiz.api";
let timeoutId;

const autoSave = (key, data, quizId) => {
  clearTimeout(timeoutId);

  const newTimeout = setTimeout(() => {
    saveData(key, data, quizId);
  }, 1000);
  timeoutId = newTimeout;
};

export default autoSave;
