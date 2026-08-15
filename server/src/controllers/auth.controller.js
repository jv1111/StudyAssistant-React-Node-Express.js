const passport = require("passport");

const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler.js");

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

const login = (req, res, next) => {
  passport.authenticate("local", (error, user) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Authentication failed",
      });
    }

    req.login(user, (error) => {
      if (error) {
        return next(error);
      }

      return res.status(200).json({
        success: true,
        user: createUserResponse(user),
      });
    });
  })(req, res, next);
};

const getSession = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: "There is no active session",
    });
  }

  return res.status(200).json({
    success: true,
    user: createUserResponse(req.user),
  });
};

const logout = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.clearCookie("connect.sid");

      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
};

module.exports = {
  register,
  login,
  getSession,
  logout,
};
