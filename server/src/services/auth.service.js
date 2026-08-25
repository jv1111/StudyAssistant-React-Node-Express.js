const bcrypt = require("bcrypt");

const userService = require("./user.service");

const { generateUniqueUsername } = require("../utils/uniqueUsernameGenerator");

const AppError = require("../utils/AppError");

const register = async ({ username, password }) => {
  const existingUser = await userService.getUserByUsername(username);

  if (existingUser) {
    throw new AppError("Username is already taken", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return userService.createUser({
    username,
    password: hashedPassword,
  });
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
  sub: googleId,
  given_name,
  picture,
  email,
  email_verified: emailVerified,
}) => {
  let user = await userService.getUserByGoogleId(googleId);

  if (user) {
    return user;
  }

  const existingUser = await userService.getUserByEmail(email);

  if (existingUser) {
    return existingUser;
  }

  const username = await generateUniqueUsername(given_name, User);

  return userService.createUser({
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
};

module.exports = {
  register,
  verifyCredentials,
  findOrCreateGoogleUser,
};
