const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
    try {
        // get todos and return them
        const todos = await Todo.findAll({
            where: {
                userid: req.body.userid,
            },
        });

        return res.json(todos);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not get todos." });
    }
};
