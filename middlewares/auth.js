const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    const token = req.header("token");

    if (!token) {
        return res.json({ status: "No token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);

        req.user = decoded.user;

        next();
    } catch (error) {
        return res.json({ status: "Token not valid." });
    }
};
