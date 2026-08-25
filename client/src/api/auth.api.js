import api from "./axios";

const loginAPI = async (usernameOrEmail, password) => {
  try {
    const response = await api.post("/auth/login", {
      usernameOrEmail,
      password,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};

const signUpAPI = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
    };
  }
};

const googleLoginAPI = async (credential) => {
  try {
    const response = await api.post("/auth/google", {
      credential,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Google sign-in failed",
    };
  }
};

const getMeAPI = async () => {
  try {
    const response = await api.get("/auth/me");

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to get user",
    };
  }
};

const logoutAPI = async () => {
  try {
    const response = await api.post("/auth/logout");

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Logout failed",
    };
  }
};

export { loginAPI, signUpAPI, googleLoginAPI, getMeAPI, logoutAPI };
