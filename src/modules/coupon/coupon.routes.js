import { Router } from "express";
import {
  addCoupon,
  deleteCoupon,
  getCoupon,
  updateCoupon,
} from "./coupon.controller.js";
import { allowTO, protectedRoute } from "../auth/auth.controller.js";
import { validate } from "./../../middlewares/validate.js";
import {
  addCouponValidation,
  updateCouponValidation,
} from "./coupon.validation.js";

const couponRouter = Router();

couponRouter.use(protectedRoute);

couponRouter.get("/get", allowTO("user", "admin"), getCoupon);
couponRouter.delete("/delete/:id", allowTO("admin"), deleteCoupon);
couponRouter.put(
  "/update/:id",
  validate(updateCouponValidation),
  allowTO("admin"),
  updateCoupon
);
couponRouter.post(
  "/add",
  validate(addCouponValidation),
  allowTO("admin"),
  addCoupon
);

export default couponRouter;
