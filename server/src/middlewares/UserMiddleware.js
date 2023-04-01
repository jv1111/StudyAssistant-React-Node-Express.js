// check if user is logged in or authenticated
const VerifyAuth = (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "unauthrized" });
    next();
}

module.exports = {
    VerifyAuth
}