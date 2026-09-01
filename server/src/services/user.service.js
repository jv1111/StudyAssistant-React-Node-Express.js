const env = require("../config/env");

const User = require("../models/user.model");
const AppError = require("../utils/AppError");

const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const getUserByUsername = async (username) => {
  return User.findOne({ username });
};

const getUserByUsernameOrEmail = async (usernameOrEmail) => {
  return User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
};

const isUsernameAvailable = async (username) => {
  const userExists = await User.exists({ username });

  return !userExists;
};

const createUser = async (userData) => {
  const user = new User(userData);

  await user.save();

  return user;
};

const changeProfile = async (userId, file) => {
  const user = await getUserById(userId);

  user.profileImg = {
    url: `/uploads/profile/${file.filename}`,
    filePath: file.path,
  };

  await user.save();

  return {
    message: "Profile image updated successfully",
  };
};

const getProfileImg = async (userId) => {
  const user = await getUserById(userId);

  return {
    url: `${env.baseUrl}${user.profileImg.url}`,
  };
};

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByUsername,
  getUserByUsernameOrEmail,
  isUsernameAvailable,
  createUser,
  changeProfile,
  getProfileImg,
};
