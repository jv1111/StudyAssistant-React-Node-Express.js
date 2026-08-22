const crypto = require("crypto");
const TokenRequest = require("../models/tokenRequest.model");

const generateToken = () => {
  const token = crypto.randomBytes(64).toString("hex");
  return token;
};

const insertTokenToDatabase = async (userId, data, token, type) => {
  const filter = {
    userId: userId,
    type: type,
  };
  const tokenExist = await TokenRequest.findOne({
    userId: userId,
    type: type,
  });

  if (tokenExist) {
    await TokenRequest.updateOne(filter, {
      verificationToken: token,
      data: data,
      createdAt: Date.now(),
    });
  } else {
    const newToken = new TokenRequest({
      userId: userId,
      verificationToken: token,
      data: data,
      type: type,
    });
    await newToken.save();
  }
};

module.exports = {
  generateToken,
  insertTokenToDatabase,
};
