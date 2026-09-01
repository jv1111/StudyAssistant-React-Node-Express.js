const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");

const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const googleAuthService = require("../services/googleAuth.service");

const {
  createUserResponse,
} = require("../utils/responseFormatters/authResponse.js");

const { successResponse } = require("../utils/response.js");

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  req.session.userId = user._id;

  successResponse(res, 201, {
    message: "Account created successfully",
    user: createUserResponse(user),
  });
});

const login = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const user = await authService.verifyCredentials(usernameOrEmail, password);

  req.session.userId = user._id;

  successResponse(res, 200, {
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

  successResponse(res, 200, {
    message: "Google sign-in successful",
    user: createUserResponse(user),
  });
});

const getMe = asyncHandler(async (req, res) => {
  if (!req.session.userId) {
    throw new AppError("There is no active session", 401);
  }

  const user = await userService.getUserById(req.session.userId);

  successResponse(res, 200, {
    user: createUserResponse(user),
  });
});

const addPassword = asyncHandler(async (req, res) => {
  if (!req.session.userId) {
    throw new AppError("There is no active session", 401);
  }

  const { password } = req.body;

  const result = await authService.addPassword(req.session.userId, password);

  successResponse(res, 200, result);
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

  successResponse(res, 200, {
    message: "Logged out successfully",
  });
});

module.exports = {
  register,
  login,
  googleLogin,
  getMe,
  addPassword,
  logout,
};
