const crypto = require("crypto");

const generateFilename = (extension) => {
  return `${crypto.randomBytes(16).toString("hex")}${extension}`;
};

module.exports = generateFilename;
