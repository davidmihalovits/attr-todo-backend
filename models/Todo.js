const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Todo = db.define("todo", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    todo: {
        type: DataTypes.STRING,
    },
});

module.exports = Todo;
