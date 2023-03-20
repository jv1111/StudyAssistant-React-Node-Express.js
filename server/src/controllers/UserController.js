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

module.exports = {
    changePass
}