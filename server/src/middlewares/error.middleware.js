const { errorResponse } = require("../utils/response");

const errorHandler = (error, req, res, next) => {
  console.error(error);
  console.log(
    "=====================================================================",
  );

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  errorResponse(res, statusCode, message, error.errors, error.code);
};

module.exports = errorHandler;
