const {
  registerSchema,
  loginSchema,
} = require("../validations/auth.validation.js");

const { errorResponse } = require("../utils/response");

const validateRegister = async (req, res, next) => {
  try {
    req.body = await registerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    next();
  } catch (error) {
    return errorResponse(
      res,
      400,
      "Validation failed",
      error.inner.map((validationError) => ({
        field: validationError.path,
        message: validationError.message,
      })),
    );
  }
};

const validateLogin = async (req, res, next) => {
  try {
    req.body = await loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    next();
  } catch (error) {
    return errorResponse(
      res,
      400,
      "Validation failed",
      error.inner.map((validationError) => ({
        field: validationError.path,
        message: validationError.message,
      })),
    );
  }
};

module.exports = {
  validateRegister,
  validateLogin,
};
