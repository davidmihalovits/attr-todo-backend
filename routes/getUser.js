const User = require("../models/User");

exports.getUser = async (req, res) => {
    try {
        // get a user and return it
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not get user." });
    }
};
