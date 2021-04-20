const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        // if username is empty
        if (!req.body.username) {
            return res.json({
                status: "Enter your username.",
            });
        }

        // if password is empty or too short
        if (!req.body.password || req.body.password.length < 6) {
            return res.json({
                status: "Password must be at least 6 characters.",
            });
        }

        // if username is taken
        const usernameTaken = await User.findOne({
            where: { username: req.body.username },
        });

        if (usernameTaken) {
            return res.json({ status: "Username already taken." });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(req.body.password, salt);

        // create new user and save to db
        const newUser = await User.create({
            username: req.body.username,
            password: bcryptPassword,
        });

        // assign user to payload
        const payload = {
            user: {
                id: newUser.id,
                username: newUser.username,
            },
        };

        // assign token to user and validate before signing up
        const token = jwt.sign(payload, process.env.jwtSecret);

        return res.json({ token, user: newUser });
    } catch (error) {
        console.log(error);
        return res.json({ status: "Signup failed." });
    }
};
