const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const AppError = require("./../utils/AppError");
const catchAsync = require("./../utils/catchAsync");
const { promisify } = require("util");
const email = require("./../utils/email");

const createActivationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.activationToken = token;

  return token;
};

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
    status: "success",
    data: user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: "user",
    activationToken: createActivationToken(),
  });

  const url = `http://localhost:8000/activate/${user.activationToken}`;
  email(user.email, url, user.name);

  res.status(200).json({
    status: "success",
    message: "Check your email for the activation link!",
  });
  // createSendToken(user, 201, req, res);
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

  if (!user.active) return next(new AppError(400, "Account not activated! Please check your email."));
  req.user = user;

  createSendToken(user, 201, req, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
  });
  req.user = undefined;
  res.status(200).json({
    status: "success",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  if (req.cookies?.jwt) {
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    req.user = currentUser;

    next();
  } else res.status(201).render("login");
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return next(new AppError(403, "Insufficient permissions!"));
    next();
  };
};
