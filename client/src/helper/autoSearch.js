let timeoutId;

const autoSearch = (setData, searchVal) => {
    // Clear the previous save timeout
    clearTimeout(timeoutId);
    
    const newTimeout = setTimeout(() => {
        // save function here
        setData(searchVal);
    }, 500);
    timeoutId = newTimeout;

}

export default autoSearch;