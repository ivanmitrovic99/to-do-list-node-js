const express = require("express");
const todoRouter = require("./routes/todoRoutes");

const app = express();

app.use("/api/todos/", todoRouter);

app.use(express.json());

module.exports = app;
