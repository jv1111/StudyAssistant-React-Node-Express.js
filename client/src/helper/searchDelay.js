let timeoutId;

const searchDelay = (setData, searchVal) => {
  // Clear the previous save timeout
  clearTimeout(timeoutId);

  const newTimeout = setTimeout(() => {
    setData(searchVal);
  }, 500);
  timeoutId = newTimeout;
};

export default searchDelay;
