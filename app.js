const path = require("path");
const express = require("express");
const ejs = require("ejs");
const cors = require("cors");
const todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const errorHandler = require("./controllers/errorController");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
ejs.delimiter = "$";
ejs.openDelimiter = "{";
ejs.closeDelimiter = "}";
app.post(bodyParser.raw({ type: "application/json" }));

app.use(cookieParser());

app.use(express.json());

app.use("/api/todos/", todoRouter);

app.use("/api/users/", userRouter);

app.use("/", viewRouter);

app.use(errorHandler);

module.exports = app;
