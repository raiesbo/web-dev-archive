const User = require("../models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

///////////////////
// handle errors //
///////////////////

const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { username: "", email: "", password: "" }

    // duplicated error code
    if (err.code === 11000) {
        errors.email = "That email or username is already registered";
        return errors;
    }

    // validation errors
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(e => {
            errors[e.properties.path] = e.properties.message;
        });
    }
    return errors;
}

////////////////
// create JWT //
////////////////

const maxAge = 3 * 24 * 60 * 60; // 3 Days in Seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SIGNATURE, { expiresIn: maxAge })
}

/////////////////
// controllers //
/////////////////

module.exports.login_get = (req, res) => {
    res.send("admin_get")
}


module.exports.signup_get = (req, res) => {
    res.send("signup_get")
}


module.exports.login_post = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id, token });
    }
    catch (err) {
        res.status(400).send(err)
    }

}


module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;

    // try to create a user with the body info, if not, send errornode
    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id, token });
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}
