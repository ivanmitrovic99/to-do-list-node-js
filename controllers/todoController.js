const mongoose = require("mongoose");
const Todo = require("../models/todoModel");
const handler = require("../utils/apiHandler");

exports.getAllTodos = handler.getAll(Todo);
exports.getTodo = handler.getOne(Todo);
exports.createTodo = handler.createOne(Todo);
exports.updateTodo = handler.updateOne(Todo);
exports.deleteTodo = handler.deleteOne(Todo);
