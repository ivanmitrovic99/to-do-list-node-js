const catchAsync = require("./catchAsync");
const AppError = require("./AppError");
const validateId = require("./validateObjectId");
const ApiFeatures = require("./apiFeatures");

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    console.log(req.query);

    const features = new ApiFeatures(Model.find(), req.query).filter().sort().limitResults().limitFields().paginate();
    const docs = await features.query;

    if (!docs) return next(new AppError(404, "No documents found!"));
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs,
    });
  });

exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    validateId(req.params.id, next);
    const doc = await Model.findById(req.params.id);
    if (!doc) return next(new AppError(404, "No document found with specified ID!"));
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    validateId(req.params.id, next);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return next(new AppError(404, "No document found with that ID"));
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    validateId(req.params.id, next);
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError(404, "No documnet found with that ID"));
    res.status(204).json({
      stats: "success",
      data: null,
    });
  });
