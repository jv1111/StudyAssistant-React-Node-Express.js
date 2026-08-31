class AppError extends Error {
  constructor(message, statusCode, code = undefined) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.name = "AppError";

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
