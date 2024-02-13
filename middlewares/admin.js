const userModel = require("../models/userModel");

const isAdmin = async (req, res, next) => {

    try {
        const user = await userModel.findById(req.user._id);
        if (!user || user.role !== 'admin') {
            return res.status(401).send({
                success: false,
                message: "Only admin can Access",
            });
        }
        next(); // Call next if user is admin
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in admin middleware",
        });
    }
}

module.exports = isAdmin;
