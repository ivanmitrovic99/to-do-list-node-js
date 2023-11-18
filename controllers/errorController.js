const AppError = require("../utils/AppError");

const sendError = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const handleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(400, message);
};

const handleDuplicateValueError = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(400, message);
};

module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") err = handleValidationError(err);
  if (err.code === 11000) err = handleDuplicateValueError(err);
  sendError(err, req, res);
};
