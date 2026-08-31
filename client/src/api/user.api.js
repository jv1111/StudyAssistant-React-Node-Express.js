import api from "./axios";

const changePassAPI = async (data) => {
  const response = await api.post("/user/changePass", data);

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

export { changePassAPI, changeProfileAPI, getProfileImageAPI };
