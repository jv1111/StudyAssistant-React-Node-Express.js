const formatDate = (dateObj) => {
    // Get the month, day, and time
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

    // Format the result
    const formattedDate = `${month} ${day}, ${formattedTime}`;

    return formattedDate;
};

module.exports = formatDate;
