import api from "../axios";

const sendEmailVerificationAPI = async (email, type) => {
  const response = await api.post("/email-verification/send", {
    email,
    type,
  });

  return response.data;
};

const verifyEmailAPI = async (code) => {
  const response = await api.post("/email-verification/verify", {
    code,
  });

  return response.data;
};

const resendEmailVerificationAPI = async () => {
  const response = await api.post("/email-verification/resend");

  return response.data;
};

export { sendEmailVerificationAPI, verifyEmailAPI, resendEmailVerificationAPI };
