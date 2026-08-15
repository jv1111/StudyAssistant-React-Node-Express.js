const bcrypt = require("bcrypt");

const UserModel = require("../models/UserModel");
const GoogleUserModel = require("../models/GoogleUserModel");

const { generateUniqueUsername } = require("../utils/uniqueUsernameGenerator");
const { generateUniqueObjectId } = require("../utils/uniqueUserIdGenerator");
const AppError = require("../utils/AppError");

const register = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    username,
    password: hashedPassword,
  });

  await user.save();

  return user;
};

const verifyCredentials = async (usernameOrEmail, password) => {
  const user = await UserModel.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  return user;
};

const getUserById = async (id) => {
  const user = await UserModel.findById(id);

  if (user) {
    return user;
  }

  const googleUser = await GoogleUserModel.findById(id);

  if (!googleUser) {
    throw new AppError("User not found", 404);
  }

  return googleUser;
};

const findOrCreateGoogleUser = async ({ given_name, picture, email }) => {
  const existingUser = await GoogleUserModel.findOne({ email });

  if (existingUser) {
    return existingUser;
  }

  const username = await generateUniqueUsername(given_name, UserModel);

  const user = new GoogleUserModel({
    username,
    email,
    profileImg: {
      url: picture,
    },
  });

  user._id = await generateUniqueObjectId(user._id, UserModel);

  await user.save();

  return user;
};

module.exports = {
  register,
  verifyCredentials,
  getUserById,
  findOrCreateGoogleUser,
};
