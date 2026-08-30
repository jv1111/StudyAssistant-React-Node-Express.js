const getPagination = (skipCount = 0, limit = 10) => {
  const skip = parseInt(skipCount, 10) || 0;

  return {
    skip,
    limit,
  };
};

module.exports = {
  getPagination,
};
