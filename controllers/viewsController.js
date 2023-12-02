const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Todo = require("../models/todoModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");

exports.getOverview = catchAsync(async (req, res, next) => {
  let currentUser = {};
  if (req.cookies?.jwt) {
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    currentUser = await User.findById(decoded.id);
  }
  const docs = await Todo.find({ user: currentUser._id });
  console.log(docs);

  res.status(200).render("overview", {
    todos: docs,
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
