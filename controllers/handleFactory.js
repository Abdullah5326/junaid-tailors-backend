import catchAsync from "../utils/catchAsync.js";

export const getAll = (Model, populateObj) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find();
    if (populateObj) query = Model.find().populate(populateObj);
    const docs = await query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

export const getOne = (Model, populateObj) =>
  catchAsync(async (req, res, next) => {
    console.log(populateObj);
    const id = req.params.id;
    let query = Model.findById(id);

    if (populateObj) query = query.populate(populateObj);

    const doc = await query;

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const doc = await Model.create(req.body);
    console.log("comes");
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const doc = await Model.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    await Model.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      message: "You successfully deleted the driver",
    });
  });
