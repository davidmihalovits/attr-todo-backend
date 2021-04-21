const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const { auth } = require("./middlewares/auth");

const { signup } = require("./routes/signup");
const { login } = require("./routes/login");

const { getUsers } = require("./routes/getUsers");
const { profile } = require("./routes/profile");
const { addUser } = require("./routes/addUser");
const { getUser } = require("./routes/getUser");
const { updateUser } = require("./routes/updateUser");
const { deleteUser } = require("./routes/deleteUser");

const { addTodo } = require("./routes/addTodo");
const { updateTodo } = require("./routes/updateTodo");
const { deleteTodo } = require("./routes/deleteTodo");
const { getTodos } = require("./routes/getTodos");

// initialize server, use cors so server on Heroku can communicate with client on Netlify, parse incoming JSON
const app = express();
app.use(cors());
app.use(express.json());

// connect database, syncs everytime there is a change
db.authenticate().then(() => console.log("Postgres database connected."));
db.sync({ alter: true });

// routes
app.post("/signup", signup);
app.post("/login", login);

// protected routes - auth
app.get("/getUsers", auth, getUsers);
app.get("/profile", auth, profile);
app.post("/addUser", auth, addUser);
app.get("/getUser/:id", auth, getUser);
app.put("/updateUser/:id", auth, updateUser);
app.delete("/deleteUser/:id", auth, deleteUser);

app.post("/addTodo", auth, addTodo);
app.put("/updateTodo/:id", auth, updateTodo);
app.delete("/deleteTodo/:id", auth, deleteTodo);
app.get("/getTodos/:id", auth, getTodos);

// runs on port 5000 locally or on environment provided by server (e.g. Heroku)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
