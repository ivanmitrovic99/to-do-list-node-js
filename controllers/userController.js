const mongoose = require("mongoose");
const User = require("../models/userModel");
const handler = require("../utils/apiHandler");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = handler.getAll(User);
exports.getUser = handler.getOne(User);
exports.createUser = handler.createOne(User);
exports.updateUser = handler.updateOne(User);
exports.deleteUser = handler.deleteOne(User);
exports.activateUser = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndUpdate({ activationToken: req.params.token }, { active: true }, { new: true });
  res.status(200).json({
    message: "success",
    data: user,
  });
});
