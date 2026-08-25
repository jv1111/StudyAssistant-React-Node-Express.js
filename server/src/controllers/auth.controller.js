const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");

const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const googleAuthService = require("../services/googleAuth.service");

const createUserResponse = (user) => ({
  id: user._id,
  email: user.email,
  username: user.username,
  emailVerified: user.emailVerified,
  createdAt: user.createdAt,
});

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  req.session.userId = user._id;

  return res.status(201).json({
    success: true,
    message: "Account created successfully",
    user: createUserResponse(user),
  });
});

const login = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const user = await authService.verifyCredentials(usernameOrEmail, password);

  req.session.userId = user._id;

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: createUserResponse(user),
  });
});

const googleLogin = asyncHandler(async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    throw new AppError("Google credential is required", 400);
  }

  const googleUser = await googleAuthService.verifyGoogleToken(credential);

  const user = await authService.findOrCreateGoogleUser(googleUser);

  req.session.userId = user._id;

  return res.status(200).json({
    success: true,
    message: "Google sign-in successful",
    user: createUserResponse(user),
  });
});

const getMe = asyncHandler(async (req, res) => {
  if (!req.session.userId) {
    throw new AppError("There is no active session", 401);
  }

  const user = await userService.getUserById(req.session.userId);

  return res.status(200).json({
    success: true,
    user: createUserResponse(user),
  });
});

const logout = asyncHandler(async (req, res) => {
  await new Promise((resolve, reject) => {
    req.session.destroy((error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });

  res.clearCookie("connect.sid");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = {
  register,
  login,
  googleLogin,
  getMe,
  logout,
};
