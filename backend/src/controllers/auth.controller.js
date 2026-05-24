const userModel = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {

    const { fullName, email, password } = req.body; //need middleware to read the body
    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: 'User already exists'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hashing the password

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, "18cf7191db4700209f6ccffbdfa1af7bc9b06e16")
    res.cookie('token', token)

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, "18cf7191db4700209f6ccffbdfa1af7bc9b06e16")

    res.cookie('token', token)

    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })
}

module.exports = {
    registerUser,
    loginUser
}