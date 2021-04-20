const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
    try {
        // find user in db
        const user = await User.findOne({
            where: { username: req.body.username },
        });

        // if no user found in db, stop here
        if (!user) {
            return res.json({ status: "Invalid credentials." });
        }

        // password validation
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.json({ status: "Invalid credentials." });
        }

        // assign payload to user
        const payload = {
            user: {
                id: user.id,
                username: user.username,
            },
        };

        // assign token to user and validate before logging in
        const token = jwt.sign(payload, process.env.jwtSecret);

        return res.json({ token, user });
    } catch (error) {
        console.log(error);
        return res.json({ status: "Login failed." });
    }
};
