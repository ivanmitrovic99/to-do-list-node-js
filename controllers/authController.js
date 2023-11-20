const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const AppError = require("./../utils/AppError");
const catchAsync = require("./../utils/catchAsync");
const promisify = require("util");

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined;

  res.status(statusCode).json({
    message: "success",
    data: user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.email,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(user, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
  });

  if (!email || !password) return next(new AppError(401, "Please provide email and password"));

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(401, "Invalid password or email"));
  }
  createSendToken(user, 201, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  if (req.cookies?.jwt) token = next();
  else return next(new AppError(401, "Unauthorized access! Please login!"));
});
