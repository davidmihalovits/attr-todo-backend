const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    // verify user with a jwt token in header
    const token = req.header("token");

    // if no token, stop here
    if (!token) {
        return res.json({ status: "No token." });
    }

    // try to verify user and decode it, if token invalid then stop here
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);

        req.user = decoded.user;

        next();
    } catch (error) {
        return res.json({ status: "Token not valid." });
    }
};
