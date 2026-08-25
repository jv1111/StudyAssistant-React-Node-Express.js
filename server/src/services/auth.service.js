const bcrypt = require("bcrypt");

const User = require("../models/user.model");

const { generateUniqueUsername } = require("../utils/uniqueUsernameGenerator");

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

  if (!user || !user.password) {
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

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const findOrCreateGoogleUser = async ({
  sub: googleId,
  given_name,
  picture,
  email,
  email_verified: emailVerified,
}) => {
  let user = await User.findOne({ googleId });

  if (user) {
    return user;
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(
      "An account with this email already exists. Please sign in using your existing account.",
      409,
    );
  }

  const username = await generateUniqueUsername(given_name, User);

  user = new User({
    googleId,
    username,
    email,
    emailVerified,
    password: null,
    profileImg: {
      url: picture || null,
      filePath: null,
    },
  });

  await user.save();

  return user;
};

module.exports = {
  register,
  verifyCredentials,
  getUserById,
  findOrCreateGoogleUser,
};
