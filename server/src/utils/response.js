const successResponse = (res, statusCode, data) => {
  return res.status(statusCode).json(data);
};

const errorResponse = (res, statusCode, message, errors = undefined) => {
  return res.status(statusCode).json({
    message,
    ...(errors && { errors }),
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
