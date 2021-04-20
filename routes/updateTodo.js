const Todo = require("../models/Todo");

exports.updateTodo = async (req, res) => {
    try {
        // get a todo
        const todo = await Todo.findOne({
            where: {
                id: req.params.id,
            },
        });

        // update this todo
        await todo.update({
            todo: req.body.todo,
        });

        return res.json(todo);
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not update todo." });
    }
};
