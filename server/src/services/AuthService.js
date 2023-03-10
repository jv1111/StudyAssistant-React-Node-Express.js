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

module.exports = {
    register
}