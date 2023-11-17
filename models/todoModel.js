const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You must specify the name!"],
    },
    task: {
      type: String,
      required: [true, "Please specify the task!"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: Date,
    timeEstimation: String,
    loggedTime: String,
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
