const mongoose = require("mongoose");
const Todo = require("../models/todoModel");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      status: "success",
      data: todos,
      results: todos.length,
    });
  } catch {
    res.status(404, {
      status: "failed",
      message: "get fucked",
    });
  }
};

exports.helloMessage = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};
