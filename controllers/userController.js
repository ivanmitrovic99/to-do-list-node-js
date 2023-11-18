const mongoose = require("mongoose");
const User = require("../models/userModel");
const handler = require("../utils/apiHandler");

exports.getAllUsers = handler.getAll(User);
exports.getUser = handler.getOne(User);
exports.createUser = handler.createOne(User);
exports.updateUser = handler.updateOne(User);
exports.deleteUser = handler.deleteOne(User);
