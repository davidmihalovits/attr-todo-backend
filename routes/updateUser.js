const User = require("../models/User");

exports.updateUser = async (req, res) => {
    try {
        // get a user
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (req.body.username) {
            // if username is taken stop here
            const usernameTaken = await User.findOne({
                where: { username: req.body.username },
            });

            if (usernameTaken) {
                return res.json({ status: "Username already taken." });
            }

            await user.update({
                username: req.body.username,
            });
        }

        if (req.body.image) {
            await user.update({
                image: req.body.image,
            });
        }

        return res.json({ user });
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not update user." });
    }
};
