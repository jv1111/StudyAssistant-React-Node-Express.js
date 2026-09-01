const bcrypt = require("bcrypt");

const userService = require("./user.service");
const quizService = require("./quiz.service");

const { generateUniqueUsername } = require("../utils/uniqueUsernameGenerator");
const { saveGoogleProfileImage } = require("../utils/googleProfileImage");

const AppError = require("../utils/AppError");

const register = async ({ username, password }) => {
  const existingUser = await userService.getUserByUsername(username);

  if (existingUser) {
    throw new AppError("Username is already taken", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userService.createUser({
    username,
    password: hashedPassword,
  });

  await quizService.createSampleQuiz(user._id);

  return user;
};

const verifyCredentials = async (usernameOrEmail, password) => {
  const user = await userService.getUserByUsernameOrEmail(usernameOrEmail);

  if (!user || !user.password) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  return user;
};

const findOrCreateGoogleUser = async ({
  given_name,
  picture,
  email,
  email_verified: emailVerified,
}) => {
  const existingUser = await userService.getUserByEmail(email);

  if (existingUser) {
    return existingUser;
  }

  const username = await generateUniqueUsername(
    given_name,
    userService.isUsernameAvailable,
  );

  const user = await userService.createUser({
    username,
    email,
    emailVerified,
    password: null,
  });

  if (picture) {
    const profileImg = await saveGoogleProfileImage(picture);

    user.profileImg = profileImg;

    await user.save();
  }

  await quizService.createSampleQuiz(user._id);

  return user;
};

module.exports = {
  register,
  verifyCredentials,
  findOrCreateGoogleUser,
};
