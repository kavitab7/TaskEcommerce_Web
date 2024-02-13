const JWT = require('jsonwebtoken');

const isSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        if (error instanceof JWT.TokenExpiredError) {
            return res.status(401).json({ success: false, message: "Token expired" });
        }
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}

module.exports = isSignIn;
