import api from "./axios";

const changePass = async (newPasswordData) => {
  const response = await api.post("/user/changePass", newPasswordData);

  return response.data;
};

const changeProfile = async (formData) => {
  const response = await api.post("/user/changeProfileImg", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const fetchProfileImgAPI = async () => {
  const response = await api.post("/user/getProfileImg");

  return response.data;
};

const addOrUpdateEmail = async (newEmail) => {
  const response = await api.put("/user/addOrUpdateEmail", {
    newEmail,
  });

  return response.data;
};

const verifyEmailApi = async (userId, token) => {
  const response = await api.put("/user/verifyEmail", {
    userId,
    token,
  });

  return response.data;
};

const resetPassRequestApi = async (email) => {
  const response = await api.put("/user/sendResetPassRequest", {
    email,
  });

  return response.data;
};

const verifyTokenRequest = async (userId, token, type) => {
  const response = await api.put("/user/verifyToken", {
    userId,
    token,
    type,
  });

  return response.data;
};

const resetPass = async ({ userId, newPassword }) => {
  const response = await api.put("/user/resetPass", {
    userId,
    newPassword,
  });

  return response.data;
};

export {
  changePass,
  changeProfile,
  fetchProfileImgAPI,
  addOrUpdateEmail,
  verifyEmailApi,
  resetPassRequestApi,
  verifyTokenRequest,
  resetPass,
};
