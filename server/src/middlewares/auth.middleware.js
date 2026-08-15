const AppError = require("../utils/AppError.js");

const verifyAuth = (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
  }

  next();
};

module.exports = {
  verifyAuth,
};
