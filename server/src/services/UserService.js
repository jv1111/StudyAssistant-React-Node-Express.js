const UserModel = require("../models/UserModel");
const GoogleUserModel = require("../models/GoogleUserModel");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const bcrypt = require("bcrypt");
const { generateToken, insertTokenToDatabase } = require("../utils/tokenGenerator");
const sendEmail = require("../utils/sendEmail");
const { VerifacationLinkBuilder } = require("../utils/htmlBuilder");
const TokenRequestModel = require("../models/TokenRequestModel");

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
    if (user) return { url: user.profileImg.url }
    const googleUser = await GoogleUserModel.findById(userId);
    return { url: googleUser.profileImg.url };
}

const addOrUpdateEmail = async (userId, newEmail) => {

    const token = generateToken(userId, "addOrUpdateEmail");
    const data = { email: newEmail }
    await insertTokenToDatabase(userId, data, token, "addOrUpdateEmail");

    const url = `${process.env.CLIENT_URL}/verification/verifyEmail/${userId}/${token}`;
    await sendEmail(
        process.env.MAILER_USER,
        newEmail,
        "Email Verification",//subject
        url,
        VerifacationLinkBuilder(
            "Verify your email",
            "Click the button below to verify your email",//message
            url,
            "Verify Email"//button name
        )
    );
    // todo create a send email function to send the token
    return {
        success: true,
    }
}

const sendResetPassRequest = async (email) => {
    const token = generateToken();
    const user = await UserModel.findOne({ email: email });
    const data = { email: email }
    console.log(user);

    if (!user) return { error: "this email is not registered" }
    await insertTokenToDatabase(user._id, data, token, "resetPass");

    const url = `${process.env.CLIENT_URL}/verification/resetPassword/${user._id}/${token}`;
    await sendEmail(
        process.env.MAILER_USER,
        email,
        "Reset Password",//subject
        url,
        VerifacationLinkBuilder(
            "Reset your password",
            "Click the button below to reset your password",//message
            url,
            "Reset your password"//button name
        )
    );
    return { success: true }
}

const verifyEmail = async (userId, token) => {
    const filter = {
        userId: userId,
        token: token
    }

    // check if the token exist in the database
    const registeredToken = await TokenRequestModel.findOne(filter);
    if (!registeredToken) return { error: "invalid link" }

    // add the email to the user and delete the token if the link is valid
    await UserModel.findByIdAndUpdate(userId, { email: registeredToken.data.email });
    await TokenRequestModel.findOneAndDelete(filter);

    return { success: true, message: "Email has been verified" }
}

const verifyToken = async (userId, token, type) => {
    const filter = {
        userId: userId,
        token: token,
        type: type
    }
    const registeredToken = await TokenRequestModel.findOne(filter);
    if (!registeredToken) return { error: "invalid link" }
    return { success: true, message: "Token is valid" }
}

const resetPass = async (userId, newPassword) => {
    console.log(newPassword);
    console.log(userId);
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.findByIdAndUpdate(userId, {
        password: newHashedPassword
    });
    return {
        success: true,
        message: "Password changed"
    }
}

module.exports = {
    changePass,
    changeProfile,
    getProfileImg,
    addOrUpdateEmail,
    verifyEmail,
    sendResetPassRequest,
    resetPass,
    verifyToken
}