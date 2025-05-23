import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "./user.controller.js";
import { allowTO, protectedRoute } from "../auth/auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import { updateUserValidation } from "./user.validation.js";

const userRouter = Router();

userRouter.use(protectedRoute, allowTO("admin"));

userRouter.get("/get", getUsers);
userRouter.put("/update/:id", validate(updateUserValidation), updateUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.post("/add", addUser);

export default userRouter;
