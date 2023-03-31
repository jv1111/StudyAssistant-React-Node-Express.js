const crypto = require('crypto');
const TokenRequestModel = require("../models/TokenRequestModel");

const generateToken = () => {
    const token = crypto.randomBytes(64).toString("hex");
    return token;
}

const insertTokenToDatabase = async (userId, token, type) => {
    console.log("inserting token");
    const filter = {
        userId: userId,
        type: type,
    }
    const tokenExist = await TokenRequestModel.findOne({
        userId: userId,
        type: type
    });
    console.log(tokenExist);
    if (tokenExist) {
        console.log("updating");
        await TokenRequestModel.updateOne(
            filter,
            {
                verificationToken: token,
                createdAt: Date.now()
            }
        )
    } else {
        console.log("inserting");
        const newToken = new TokenRequestModel({
            userId: userId,
            verificationToken: token,
            type: type
        });
        await newToken.save();
    }
}


module.exports = {
    generateToken,
    insertTokenToDatabase
}