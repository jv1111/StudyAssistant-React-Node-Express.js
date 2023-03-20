const UserModel = require("../models/UserModel");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const bcrypt = require("bcrypt");

const changePass = async (userId, oldPassword, newPassword) => {
    const user = await UserModel.findById(userId);
    const passwordMatched = await bcrypt.compare(oldPassword, user.password)//check if Old password matched the current password
    if (!passwordMatched) return { error: "Invalid password" }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.findByIdAndUpdate(userId, {
        password: newHashedPassword
    });
    return { success: true, }
}

const changeProfile = async (userId, filePath) => {
    const imgUrl = filePath.replace("public", process.env.BASE_URL);//updates the accessible path on web
    await deleteLastProfileImg(userId);//remove the last profile image from the disk/server
    await UserModel.findByIdAndUpdate(userId, {
        profileImg: {
            url: imgUrl,
            filePath: filePath
        }
    });
    return {
        message: "profile picture updated",
        success: true
    }
}

const deleteLastProfileImg = async (userId) => {
    const user = await UserModel.findById(userId);
    const filePath = user.profileImg.filePath;
    try {
        if (filePath) await unlinkFile(filePath);
        return { success: true }
    } catch (error) {
        return { error: error }
    }
}

const getProfileImg = async (userId) => {
    const user = await UserModel.findById(userId);
    const profileImgUrl = user.profileImg.url;
    return { url: profileImgUrl }
}

module.exports = {
    changePass,
    changeProfile,
    getProfileImg
}