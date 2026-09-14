const formatDate = (dateObj) => {
  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;

  const formattedDate = `${month} ${day}, ${formattedTime}`;

  return formattedDate;
};

module.exports = formatDate;
