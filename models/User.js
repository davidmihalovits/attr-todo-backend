const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
    },
    password: {
        type: DataTypes.STRING,
        required: true,
    },
    image: {
        type: DataTypes.STRING,
    },
});

module.exports = User;
