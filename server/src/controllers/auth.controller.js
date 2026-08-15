const passport = require("passport");

const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");

const createUserResponse = (user) => ({
  id: user._id,
  email: user.email,
  username: user.username,
  emailVerified: user.emailVerified,
  createdAt: user.createdAt,
});

const register = asyncHandler(async (req, res, next) => {
  const user = await authService.register(req.body);

  req.login(user, (error) => {
    if (error) {
      return next(error);
    }

    return res.status(201).json({
      success: true,
      user: createUserResponse(user),
    });
  });
});

const login = asyncHandler(async (req, res, next) => {
  await new Promise((resolve, reject) => {
    passport.authenticate("local", (error, user) => {
      if (error) {
        return reject(error);
      }

      if (!user) {
        return reject(new AppError("Authentication failed", 401));
      }

      req.login(user, (error) => {
        if (error) {
          return reject(error);
        }

        resolve();
      });
    })(req, res, next);
  });

  return res.status(200).json({
    success: true,
    user: createUserResponse(req.user),
  });
});

const getSession = asyncHandler((req, res) => {
  if (!req.user) {
    throw new AppError("There is no active session", 401);
  }

  return res.status(200).json({
    success: true,
    user: createUserResponse(req.user),
  });
});

const logout = asyncHandler(async (req, res) => {
  await new Promise((resolve, reject) => {
    req.logout((error) => {
      if (error) {
        return reject(error);
      }

      req.session.destroy((error) => {
        if (error) {
          return reject(error);
        }

        resolve();
      });
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
  getSession,
  logout,
};
