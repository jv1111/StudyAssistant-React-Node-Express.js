let timeoutId;

const searchDelay = (setData, searchVal) => {
  clearTimeout(timeoutId);

  const newTimeout = setTimeout(() => {
    setData(searchVal);
  }, 500);
  timeoutId = newTimeout;
};

export default searchDelay;
