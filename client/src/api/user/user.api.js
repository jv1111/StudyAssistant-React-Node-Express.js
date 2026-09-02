import api from "../axios";

const changeProfileAPI = async (formData) => {
  const response = await api.post("/user/changeProfileImg", formData);

  return response.data;
};

const getProfileImageAPI = async () => {
  const response = await api.get("/user/profileImg");

  return response.data;
};

export { changeProfileAPI, getProfileImageAPI };
