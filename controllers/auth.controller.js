const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation/validation');

const login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(403).send('Email or password is incorrect');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(403).send('Email or password is incorrect');

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    user = await User.findOne({ email: req.body.email }).select('-password');

    res.header('Authorization', token).status(200).json({token,user});
}

const register = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(403).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await newUser.save();
        // return user without password
        savedUser.password = undefined;
        res.status(200).send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
}

const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}

module.exports = {
    login,
    register,
    getCurrentUser
}