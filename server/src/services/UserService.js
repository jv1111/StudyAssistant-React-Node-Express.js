const UserModel = require("../models/UserModel");
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

module.exports = {
    changePass
}