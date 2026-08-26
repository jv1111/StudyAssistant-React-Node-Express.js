const successResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({
    success: true,
    ...data,
  });
};

const errorResponse = (res, statusCode, message, errors = undefined) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
