const User = require("../models/User");

exports.profile = async (req, res) => {
    try {
        // get profile and return it
        const user = await User.findOne({
            where: {
                id: req.user.id,
            },
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not get profile." });
    }
};
