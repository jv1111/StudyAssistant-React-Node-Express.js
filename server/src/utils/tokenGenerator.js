const crypto = require('crypto');
const TokenRequestModel = require("../models/TokenRequestModel");

const generateToken = () => {
    const token = crypto.randomBytes(64).toString("hex");
    return token;
}

const insertTokenToDatabase = async (userId, data, token, type) => {
    const filter = {
        userId: userId,
        type: type,
    }
    const tokenExist = await TokenRequestModel.findOne({
        userId: userId,
        type: type
    });

    if (tokenExist) {
        await TokenRequestModel.updateOne(
            filter,
            {
                verificationToken: token,
                data: data,
                createdAt: Date.now()
            }
        )
    } else {
        const newToken = new TokenRequestModel({
            userId: userId,
            verificationToken: token,
            data: data,
            type: type
        });
        await newToken.save();
    }
}


module.exports = {
    generateToken,
    insertTokenToDatabase
}