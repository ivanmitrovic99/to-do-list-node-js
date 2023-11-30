const Todo = require("../models/todoModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  const docs = await Todo.find();

  res.status(200).render("overview", {
    todos: docs,
  });
});
