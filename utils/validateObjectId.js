const AppError = require("./AppError");
module.exports = (id, next) => {
  objectIdPattern = /^[0-9a-fA-F]{24}$/;
  if (!objectIdPattern.test(id)) {
    return next(new AppError(401, "The provided document ID is invalid!"));
  }
};
