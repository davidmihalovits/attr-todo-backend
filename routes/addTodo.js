const Todo = require("../models/Todo");

exports.addTodo = async (req, res) => {
    try {
        // create new todo and save to db
        const newTodo = await Todo.create({
            todo: req.body.todo,
            userid: req.body.userid,
        });

        return res.json(newTodo);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Couldn't add todo." });
    }
};
