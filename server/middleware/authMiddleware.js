const jwt = require("jsonwebtoken");

const requestAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check json web token exists and is verified;
    if (token) {
        jwt.token(token, process.env.SIGNATURE, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect("/login");
    }
}

module.exports = { requestAuth };