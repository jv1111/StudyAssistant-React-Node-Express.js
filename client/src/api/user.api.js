import api from "./axios";

const changePasswordAPI = async (passwordData) => {
  const response = await api.post("/user/changePass", passwordData);

  return response.data;
};

const changeProfileAPI = async (formData) => {
  const response = await api.post("/user/changeProfileImg", formData);

  return response.data;
};

const getProfileImageAPI = async () => {
  const response = await api.get("/user/profileImg");

  return response.data;
};

const updateEmailAPI = async (newEmail) => {
  const response = await api.put("/user/email", {
    newEmail,
  });

  return response.data;
};

const verifyEmailAPI = async (userId, token) => {
  const response = await api.put("/user/verifyEmail", {
    userId,
    token,
  });

  return response.data;
};

const requestPasswordResetAPI = async (email) => {
  const response = await api.put("/user/sendResetPassRequest", {
    email,
  });

  return response.data;
};

const verifyTokenAPI = async (userId, token, type) => {
  const response = await api.put("/user/verifyToken", {
    userId,
    token,
    type,
  });

  return response.data;
};

const resetPasswordAPI = async (userId, newPassword) => {
  const response = await api.put("/user/resetPass", {
    userId,
    newPassword,
  });

  return response.data;
};

export {
  changePasswordAPI,
  changeProfileAPI,
  getProfileImageAPI,
  updateEmailAPI,
  verifyEmailAPI,
  requestPasswordResetAPI,
  verifyTokenAPI,
  resetPasswordAPI,
};
