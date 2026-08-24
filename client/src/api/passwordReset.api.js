import api from "./axios";

const requestPasswordResetAPI = async (email) => {
  try {
    const response = await api.post("/password-reset/request", {
      email,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to request password reset",
    };
  }
};

const validateResetTokenAPI = async (token) => {
  try {
    const response = await api.post("/password-reset/validate", {
      token,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Invalid or expired reset link",
    };
  }
};

const resetPasswordAPI = async (token, newPassword) => {
  try {
    const response = await api.post("/password-reset/reset", {
      token,
      newPassword,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to reset password",
    };
  }
};

export { requestPasswordResetAPI, validateResetTokenAPI, resetPasswordAPI };
