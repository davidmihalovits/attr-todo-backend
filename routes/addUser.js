const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res) => {
    try {
        // if username is empty stop here
        if (!req.body.username) {
            return res.json({
                status: "Enter a username.",
            });
        }

        // if password is empty or too short stop here
        if (!req.body.password || req.body.password.length < 6) {
            return res.json({
                status: "Password must be at least 6 characters.",
            });
        }

        // if username is taken stop here
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

        return res.json({ newUser });
    } catch (error) {
        console.log(error);
        return res.json({ status: "Couldn't add user." });
    }
};
