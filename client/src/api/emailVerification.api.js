import api from "./axios";

const sendEmailVerificationAPI = async (email) => {
  try {
    const response = await api.post("/email-verification/send", {
      email,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong.",
    };
  }
};

const verifyEmailAPI = async (code) => {
  try {
    const response = await api.post("/email-verification/verify", {
      code,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong.",
    };
  }
};

const resendEmailVerificationAPI = async () => {
  try {
    const response = await api.post("/email-verification/resend");

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong.",
    };
  }
};

export { sendEmailVerificationAPI, verifyEmailAPI, resendEmailVerificationAPI };
