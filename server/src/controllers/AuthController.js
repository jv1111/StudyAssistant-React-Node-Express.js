const service = require("../services/AuthService.js");
const passport = require("passport");

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
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

const login = (req, res, next) => {
    try {
        passport.authenticate('local', async (error, user) => {
            if (error) return res.status(400).json({ error: error.message });
            // login the user and create a session. this will use passport.serializeUser
            req.login(user, (error) => {
                if (error) return res.status(500).json({error: error.message});
                res.status(200).json({
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    emailVerified: user.emailVerified,
                    createdAt: user.createdAt
                });
            });
        })(req, res, next);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register,
    login
}