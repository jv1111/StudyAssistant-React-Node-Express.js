const {
  registerSchema,
  loginSchema,
} = require("../validations/auth.validation.js");

const validateRegister = async (req, res, next) => {
  try {
    req.body = await registerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.inner.map((validationError) => ({
        field: validationError.path,
        message: validationError.message,
      })),
    });
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
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.inner.map((validationError) => ({
        field: validationError.path,
        message: validationError.message,
      })),
    });
  }
};

module.exports = {
  validateRegister,
  validateLogin,
};
