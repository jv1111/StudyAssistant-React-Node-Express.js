const User = require("../models/user.model");
const AppError = require("../utils/AppError");

const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const getUserByGoogleId = async (googleId) => {
  return User.findOne({ googleId });
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();

  return user;
};

module.exports = {
  getUserById,
  getUserByGoogleId,
  getUserByEmail,
  createUser,
};
