const AppError = require("../utils/AppError.js");
const authService = require("../services/auth.service");

const verifyAuth = async (req, res, next) => {
  if (!req.session.userId) {
    return next(new AppError("Unauthorized", 401));
  }

  try {
    const user = await authService.getUserById(req.session.userId);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyAuth,
};
