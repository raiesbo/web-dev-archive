const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();



module.exports.admin_get = (req, res) => {
    res.send("admin_get")
}


module.exports.signup_get = (req, res) => {
    res.send("signup_get")
}


module.exports.admin_post = async (req, res) => {
    res.send("admin_post")
}


module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;

    // try to create a user with the body info, if not, send errornode
    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({ user });
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}
