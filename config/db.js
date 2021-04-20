const { Sequelize } = require("sequelize");
require("dotenv").config();

const dev = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const prod = process.env.DATABASE_URL; // heroku Postgres addon

module.exports = new Sequelize(
    process.env.NODE_ENV === "production" ? prod : dev,
    /*{
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    }*/
    { logging: false }
);
