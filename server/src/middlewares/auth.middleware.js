const AppError = require("../utils/AppError.js");
const userService = require("../services/user.service");

const verifyAuth = async (req, res, next) => {
  if (!req.session.userId) {
    return next(new AppError("Unauthorized", 401));
  }

  try {
    const user = await userService.getUserById(req.session.userId);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyAuth,
};
