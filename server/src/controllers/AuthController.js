const service = require("../services/AuthService.js");

const register = async (req, res) => {
    try {
        const userData = req.body;
        const user = await service.register(userData);
        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    register
}