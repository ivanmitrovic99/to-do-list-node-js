const express = require("express");
const todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./controllers/errorController");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.post(bodyParser.raw({ type: "application/json" }));

app.use(cookieParser());

app.use(express.json());

app.use("/api/todos/", todoRouter);

app.use("/api/users/", userRouter);

app.use(errorHandler);

module.exports = app;
