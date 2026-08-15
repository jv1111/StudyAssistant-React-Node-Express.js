  import api from "./axios";

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

  const getSessionAPI = async () => {
    const response = await api.get("/auth/login");

    return response.data;
  };

  const logoutAPI = async () => {
    const response = await api.get("/auth/logout");

    return response.data;
  };

  export { loginAPI, signUpAPI, getSessionAPI, logoutAPI };
