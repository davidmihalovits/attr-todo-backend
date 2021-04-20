const Todo = require("../models/Todo");

exports.deleteTodo = async (req, res) => {
    try {
        // get a todo
        const todo = await Todo.findOne({
            where: {
                id: req.params.id,
            },
        });

        // delete this todo
        await todo.destroy();

        return res.json({ status: "Todo deleted." });
    } catch (error) {
        console.log(error);
        return res.json({ status: "Could not delete todo." });
    }
};
