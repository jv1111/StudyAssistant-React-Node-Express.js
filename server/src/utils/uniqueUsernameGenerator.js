const generateUniqueUsername = async (username, isAvailable) => {
  if (await isAvailable(username)) {
    return username;
  }

  const maxAttempts = 10;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const suffix = generateRandomDigits(4);
    const candidate = `${username}${suffix}`;

    if (await isAvailable(candidate)) {
      return candidate;
    }
  }

  throw new AppError("Unable to generate a unique username", 500);
};

const generateRandomDigits = (numOfDigits) =>
  Math.floor(Math.random() * 10 ** numOfDigits)
    .toString()
    .padStart(numOfDigits, "0");

module.exports = {
  generateUniqueUsername,
};
