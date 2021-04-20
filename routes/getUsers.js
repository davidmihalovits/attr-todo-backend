const User = require("../models/User");

exports.getUsers = async (req, res) => {
    try {
        // get all users from db and return them
        const users = await User.findAll({
            order: [["createdAt", "DESC"]],
        });

        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not get users." });
    }
};
