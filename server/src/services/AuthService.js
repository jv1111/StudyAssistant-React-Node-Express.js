const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

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
    return user;
}

module.exports = {
    register,
    verifyCredentials,
    getUserById
}