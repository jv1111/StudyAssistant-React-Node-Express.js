const service = require("../services/UserService.js");

const changePass = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.session.passport.user;
        const response = await service.changePass(userId, oldPassword, newPassword);
        if (response.error) {
            return res.status(401).json(response);
        }
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

const changeProfile = async (req, res) => {
    try {
        const userId = req.session.passport.user;
        const filePath = req.file.path;
        const response = await service.changeProfile(userId, filePath);
        res.status(201).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

const getProfileImg = async (req, res) => {
    try {
        const userId = req.session.passport.user;
        const response = await service.getProfileImg(userId);
        res.status(200).json({
            url: response.url
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

const addOrUpdateEmail = async (req, res) => {
    try {
        const userId = req.session.passport.user;
        const newEmail = req.body.newEmail;
        const response = await service.addOrUpdateEmail(userId, newEmail);
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { userId, token } = req.body;
        const response = await service.verifyEmail(userId, token);
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    changePass,
    changeProfile,
    getProfileImg,
    addOrUpdateEmail,
    verifyEmail
}