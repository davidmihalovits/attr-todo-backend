const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const { auth } = require("./middlewares/auth");

const app = express();
app.use(cors());
app.use(express.json());
db.authenticate().then(() => console.log("Postgres database connected."));
db.sync({ alter: true });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
