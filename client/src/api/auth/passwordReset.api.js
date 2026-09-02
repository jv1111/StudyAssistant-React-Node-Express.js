import api from "../axios";

const requestPasswordResetAPI = async (email) => {
  const response = await api.post("/password-reset/request", {
    email,
  });

  return response.data;
};

const validateResetTokenAPI = async (token) => {
  const response = await api.post("/password-reset/validate", {
    token,
  });

  return response.data;
};

const resetPasswordAPI = async (token, newPassword) => {
  const response = await api.post("/password-reset/reset", {
    token,
    newPassword,
  });

  return response.data;
};

export { requestPasswordResetAPI, validateResetTokenAPI, resetPasswordAPI };
