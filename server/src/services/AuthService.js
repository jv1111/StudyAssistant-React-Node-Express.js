const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const GoogleUserModel = require("../models/GoogleUserModel");
const { generateUniqueUsername } = require("../utils/uniqueUsernameGenerator");
const { generateUniqueObjectId } = require("../utils/uniqueUserIdGenerator");

const register = async (userData) => {

    const { username, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);//encryption (10 is the salt round)

    //create the new user
    const newUser = new UserModel({
        username: username,
        password: hashedPassword
    });

    await newUser.save();//save the user to the database
    return newUser;
}

const verifyCredentials = async (usernameOrEmail, password) => {

    // find email using email or password
    const user = await UserModel.findOne({
        $or: [
            { username: usernameOrEmail },
            { email: usernameOrEmail }
        ]
    });

    if (!user) return { error: 'user not found' }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return { error: 'password not match' }
    return user;
}

const getUserById = async (id) => {
    const user = await UserModel.findById(id);
    if (user) return user;
    const googleUser = await GoogleUserModel.findById(id);
    if (googleUser) return googleUser;
}

// google authentication
const findOrCreate = async (userData) => {
    const { given_name, picture, email } = userData;

    // check if user exist
    const user = await GoogleUserModel.findOne({ email: email });
    if (user) return user;

    // create new user if the user doesn't exist
    const newUsername = await generateUniqueUsername(given_name, UserModel);

    const newUser = new GoogleUserModel({
        username: newUsername,
        email: email,
        profileImg: {
            url: picture
        },
    });

    const newId = await generateUniqueObjectId(newUser._id, UserModel);
    newUser._id = newId;

    await newUser.save();
    return newUser;
}

module.exports = {
    register,
    verifyCredentials,
    getUserById,
    findOrCreate
}