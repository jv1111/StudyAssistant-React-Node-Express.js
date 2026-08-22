const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const GoogleUser = require("../models/googleUser.model");

const { generateUniqueUsername } = require("../utils/uniqueUsernameGenerator");
const { generateUniqueObjectId } = require("../utils/uniqueUserIdGenerator");

const AppError = require("../utils/AppError");

const register = async ({ username, password }) => {
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new AppError("Username is already taken", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
  });

  await user.save();

  return user;
};

const verifyCredentials = async (usernameOrEmail, password) => {
  const user = await User.findOne({
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
  const user = await User.findById(id);

  if (user) {
    return user;
  }

  const googleUser = await GoogleUser.findById(id);

  if (!googleUser) {
    throw new AppError("User not found", 404);
  }

  return googleUser;
};

const findOrCreateGoogleUser = async ({ given_name, picture, email }) => {
  const existingUser = await GoogleUser.findOne({ email });

  if (existingUser) {
    return existingUser;
  }

  const username = await generateUniqueUsername(given_name, User);

  const user = new GoogleUser({
    username,
    email,
    profileImg: {
      url: picture,
    },
  });

  user._id = await generateUniqueObjectId(user._id, User);

  await user.save();

  return user;
};

module.exports = {
  register,
  verifyCredentials,
  getUserById,
  findOrCreateGoogleUser,
};
