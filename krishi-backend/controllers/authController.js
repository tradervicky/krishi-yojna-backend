const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/auth')
const {validateLogin, validateSignup}  = require('../utils/validators');

const generateAccessToken = (user) => {
    const payload = {
        userId: user._id,
        email: user.email,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
};


// lognow in controller
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        validateLogin.parse({ email, password });
        const findUser = await user.findOne({ email });
        if (!findUser) {
            return res.status(400).send({ message: "User doesn't exist, please use correct email" });
        }
        const validatePassword = await bcrypt.compare(password, findUser.password);
        if (!validatePassword) {
            return res.status(400).send({ message: "Invalid Password" });
        }
        const token = generateAccessToken(findUser);
        res.json({ message: 'Login successful', token, user: findUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


// signup controller 

exports.signupController = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        validateSignup.parse({ email, name, password });
        const findUser = await user.findOne({ email });
        if (findUser) {
            return res.status(400).send({ message: "User exists with this email, please try another email" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({ email, name, password: hashedPassword });
        await newUser.save();
        const accessToken = generateAccessToken(newUser);
        res.status(201).json({ message: "User created successfully", accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
