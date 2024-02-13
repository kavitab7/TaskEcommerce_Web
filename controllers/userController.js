const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const { username, email, password, phone, role } = req.body;
        if (!username || !email || !password || !phone) {
            return res.status(400).send({
                success: false,
                message: 'please fill all data'
            })
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'email already exist'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ username, email, password: hashedPassword, phone, role })
        await user.save();

        return res.status(201).send({
            success: true,
            message: 'User registerd successfully',
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'error in registration',
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'please fill all data'
            })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'email not exist'
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).send({
                success: false,
                message: 'invalid email or password'
            })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        return res.status(200).send({
            success: true,
            message: 'login successfully',
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'error in login'
        })
    }
}


module.exports = { registerUser, loginUser }