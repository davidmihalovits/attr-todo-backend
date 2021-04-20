const User = require("../models/User");

exports.deleteUser = async (req, res) => {
    try {
        // get a user
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
        });

        // delete this user
        await user.destroy();

        return res.json({ status: "User deleted." });
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not delete user." });
    }
};
