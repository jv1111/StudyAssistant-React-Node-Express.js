const infinitScroller = (event, data, setSkipCount) => {
  const { offsetHeight, scrollTop, scrollHeight } = event.target;

  if (offsetHeight + scrollTop >= scrollHeight - 1) {
    setSkipCount(data.length);
  }
};

export default infinitScroller;
