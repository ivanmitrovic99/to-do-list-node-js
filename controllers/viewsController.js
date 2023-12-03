const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Todo = require("../models/todoModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const AppError = require("../utils/AppError");

const fetchTodos = async userId => {
  return await Todo.find({ user: userId });
};

exports.getOverview = catchAsync(async (req, res, next) => {
  let currentUser = {};
  if (req.cookies?.jwt) {
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    currentUser = await User.findById(decoded.id);
  }

  const docs = await fetchTodos(currentUser._id);

  res.status(200).render("overview", {
    todos: docs,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  let currentUser = {};
  if (req.cookies?.jwt) {
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    currentUser = await User.findById(decoded.id);
  }

  res.status(200).render("user", {
    user: currentUser,
  });
});

exports.getLogin = catchAsync(async (req, res, next) => {
  res.status(200).render("login");
});

exports.getSignup = catchAsync(async (req, res, next) => {
  res.status(200).render("signup");
});

exports.getAccountActivationPage = catchAsync(async (req, res, next) => {
  res.status(200).render("accountActivated");
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (todo.user.toString() != req.user._id.toString())
    return next(new AppError(400, "You can't delete someone else's todo"));
  else {
    await Todo.findByIdAndDelete(req.params.id);

    const updatedTodos = await fetchTodos(req.user._id);

    res.status(200).render("overview", {
      status: "success",
      todos: updatedTodos,
    });
  }
});

exports.completeTodo = catchAsync(async (req, res, next) => {
  await Todo.findByIdAndUpdate(req.params.id, { completed: true });

  const updatedTodos = await fetchTodos(req.user._id);

  res.status(200).render("overview", {
    todos: updatedTodos,
  });
});
