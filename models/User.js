const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
});

module.exports = User;
