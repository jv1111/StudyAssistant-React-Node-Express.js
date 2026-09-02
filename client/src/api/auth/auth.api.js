import api from "../axios";

const loginAPI = async (usernameOrEmail, password) => {
  const response = await api.post("/auth/login", {
    usernameOrEmail,
    password,
  });

  return response.data;
};

const signUpAPI = async (userData) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};

const googleLoginAPI = async (credential) => {
  const response = await api.post("/auth/google", {
    credential,
  });

  return response.data;
};

const getMeAPI = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

const addPasswordAPI = async (password) => {
  const response = await api.post("/auth/add-password", {
    password,
  });

  return response.data;
};

const changePassAPI = async (data) => {
  const response = await api.post("/auth/change-password", data);

  return response.data;
};

const logoutAPI = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

export {
  loginAPI,
  signUpAPI,
  googleLoginAPI,
  getMeAPI,
  addPasswordAPI,
  changePassAPI,
  logoutAPI,
};
