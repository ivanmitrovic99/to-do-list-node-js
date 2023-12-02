const mongoose = require("mongoose");
const User = require("../models/userModel");
const Todo = require("../models/todoModel");
const handler = require("../utils/apiHandler");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

exports.getAllUsers = handler.getAll(User, { path: "todos", select: "name" });
exports.getUser = handler.getOne(User, { path: "todos", select: "name" });
exports.createUser = handler.createOne(User);
exports.updateUser = handler.updateOne(User);
exports.deleteUser = handler.deleteOne(User);
exports.activateUser = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndUpdate({ activationToken: req.params.token }, { active: true }, { new: true });
  if (!user) return next(new AppError(404, "Whoops something went wrong"));
  next();
});
exports.getUserTodos = catchAsync(async (req, res, next) => {
  const doc = await User.findById(req.user._id).populate("todos");
  if (!doc) return next(new AppError(404, "An unexpecter error happend. Please try logging in again!"));
  res.status(200).json({
    status: "success",
    data: doc.todos,
  });
});
exports.createUserTodo = catchAsync(async (req, res, next) => {
  const doc = await Todo.create({
    name: req.body.name,
    task: req.body.task,
    timeEstimation: req.body.timeEstimation,
    user: req.user._id,
  });
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const doc = await User.findById(req.user._id);
  if (!doc) return next(new AppError(404, "Something went wrong!"));
  res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!(await user.correctPassword(req.body.currentPassword, user.password)))
    return next(new AppError(401, "The current password is invalid!"));
  const password = await bcrypt.hash(req.body.newPassword, 12);
  await User.findByIdAndUpdate(req.user._id, {
    password,
  });
  res.status(200).json({
    status: "success",
  });
});
