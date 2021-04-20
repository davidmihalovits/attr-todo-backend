const User = require("../models/User");

exports.updateUser = async (req, res) => {
    try {
        // get a user
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
        });

        // update this user
        await user.update({
            username: req.body.username,
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not update user." });
    }
};
