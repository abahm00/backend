import { Router } from "express";
import { checkEmail } from "./../../middlewares/checkEmail.js";
import {
  changePassword,
  forgotPassword,
  login,
  register,
} from "./auth.controller.js";
import { validate } from "./../../middlewares/validate.js";
import {
  changePasswordValidation,
  forgotPasswordValidation,
  loginValidation,
  registerValidation,
} from "./auth.validation.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validate(registerValidation),
  checkEmail,
  register
);
authRouter.post("/login", validate(loginValidation), login);
authRouter.post(
  "/changePassword",
  validate(changePasswordValidation),
  changePassword
);

authRouter.post(
  "/forgotPassword",
  validate(forgotPasswordValidation),
  forgotPassword
);

export default authRouter;
