import { User } from "../../../database/models/user.model.js";
import { handleError } from "../../middlewares/catchError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = handleError(async (req, res, next) => {
  let user = new User(req.body);
  user.save();
  let token = jwt.sign({ userId: user._id, role: user.role }, "secretKey");
  res.json({ message: "user added", user, token });
});

export const login = handleError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign({ userId: user._id, role: user.role }, "secretKey");
    res.json({ message: "logged in", user, token });
  }
  res.json({ message: "invalid credentials" });
});

export const changePassword = handleError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
    let user = await User.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.newPassword, passwordChangedAt: Date.now() },
      { new: true }
    );
    let token = jwt.sign({ userId: user._id, role: user.role }, "secretKey");
    res.json({ message: "password changed", user, token });
  }
  next(new Error("invalid credentials"));
});

export const forgotPassword = handleError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    let user = await User.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.newPassword, passwordChangedAt: Date.now() },
      { new: true }
    );
    let token = jwt.sign({ userId: user._id, role: user.role }, "secretKey");
    res.json({ message: "password changed", user, token });
  }
  next(new Error("invalid credentials"));
});

export const protectedRoute = handleError(async (req, res, next) => {
  let { token } = req.headers;
  let userPayload = null;
  if (!token) {
    return next(new Error("no token"), 401);
  }

  jwt.verify(token, "secretKey", (err, payload) => {
    if (err) {
      return next(new Error("invalid token"), 401);
    }
    userPayload = payload;
  });
  let user = await User.findById(userPayload.userId);
  if (!user) {
    return next(new Error("user not found"), 404);
  }

  if (user.passwordChangedAt) {
    let time = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (time > userPayload.iat) {
      next(new Error("password changed"));
    }
  }
  req.user = user;
  next();
});

export const allowTO = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    } else {
      return next(new Error("unauthorized"));
    }
  };
};
