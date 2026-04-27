import jwt from "jsonwebtoken";
import multer from "multer";
import sharp from "sharp";
import User from "./../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

const createSendToken = function (req, res, data, statusCode) {
  const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    maxAge: 90 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      data,
    },
  });
};

export const protect = catchAsync(async (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt)
    return next(
      new AppError("You are not logged in. Please log in again.", 401),
    );

  const token = req.cookies.jwt;
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const id = decode.id;

  const user = await User.findById(id);

  if (!user)
    return next(
      new AppError("The user belonging to this token no longer exists.", 404),
    );

  req.user = user;
  next();
});

export const signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    confirmPassword: req.body.confirmPassword,
    profileImg: req.body.profileImg,
  });
  createSendToken(req, res, user, 201);
});

export const login = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email or password", 400));
  const user = await User.findOne({ email: req.body.email }).select(
    "+password",
  );

  if (!user || !(await user.correctPasswords(password, user.password)))
    return next(new AppError("The email or password is incorrect", 401));
  console.log(user);
  createSendToken(req, res, user, 200);
});

export const logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", {
    maxAge: 10 * 1000,
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "You are successfully logout.",
  });
});

export const getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  console.log(req.body, "check");
  const fieldsToUpdate = {
    name: req.body?.name,
    email: req.body?.email,
    address: req.body?.address,
  };
  console.log(fieldsToUpdate);
  if (req?.file) fieldsToUpdate.profileImg = req.file?.filename;

  const user = await User.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
    runValidators: true,
    returnDocument: "after",
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { isActive: false },
    { returnDocument: "after" },
  );

  res.status(204).json({
    status: "success",
  });
});

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  console.log(req.body, "resixe");
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});
