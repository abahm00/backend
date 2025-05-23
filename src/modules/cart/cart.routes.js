import { Router } from "express";
import {
  addToCart,
  applyCoupon,
  getCart,
  removeFromCart,
  updateQuantity,
} from "./cart.controller.js";
import { allowTO, protectedRoute } from "../auth/auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import {
  addToCartValidation,
  applyCouponValidation,
  removeFromCartValidation,
  updateQuantityValidation,
} from "./cart.validation.js";

const cartRouter = Router();

cartRouter.use(protectedRoute, allowTO("user", "admin"));

cartRouter.post("/add", validate(addToCartValidation), addToCart);
cartRouter.put("/update", validate(updateQuantityValidation), updateQuantity);
cartRouter.delete(
  "/delete",
  validate(removeFromCartValidation),
  removeFromCart
);
cartRouter.get("/get", getCart);
cartRouter.post("/applyCoupon", validate(applyCouponValidation), applyCoupon);

export default cartRouter;
