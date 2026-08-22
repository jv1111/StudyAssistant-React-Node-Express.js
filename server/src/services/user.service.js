const fs = require("fs");
const util = require("util");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const GoogleUser = require("../models/googleUser.model");

const AppError = require("../utils/AppError");

const unlinkFile = util.promisify(fs.unlink);

const changePass = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const passwordMatched = await bcrypt.compare(oldPassword, user.password);

  if (!passwordMatched) {
    throw new AppError("Invalid password", 401);
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(userId, {
    password: newHashedPassword,
  });

  return {
    success: true,
  };
};

const changeProfile = async (userId, filePath) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await deleteLastProfileImg(user);

  const imgUrl = filePath.replace("public", process.env.BASE_URL);

  await User.findByIdAndUpdate(userId, {
    profileImg: {
      url: imgUrl,
      filePath,
    },
  });

  return {
    success: true,
    message: "Profile picture updated",
  };
};

const deleteLastProfileImg = async (user) => {
  const filePath = user.profileImg?.filePath;

  if (!filePath) {
    return;
  }

  try {
    await unlinkFile(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

const getProfileImg = async (userId) => {
  const user = await User.findById(userId);

  if (user) {
    return {
      url: user.profileImg?.url,
    };
  }

  const googleUser = await GoogleUser.findById(userId);

  if (!googleUser) {
    throw new AppError("User not found", 404);
  }

  return {
    url: googleUser.profileImg?.url,
  };
};

module.exports = {
  changePass,
  changeProfile,
  getProfileImg,
};
