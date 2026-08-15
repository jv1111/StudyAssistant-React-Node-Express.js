let timeoutId;

const searchDelay = (setData, searchVal) => {
  // Clear the previous save timeout
  clearTimeout(timeoutId);

  const newTimeout = setTimeout(() => {
    // save function here
    console.log("searching");
    setData(searchVal);
  }, 500);
  timeoutId = newTimeout;
};

export default searchDelay;
