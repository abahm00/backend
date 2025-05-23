import { Router } from "express";
import { allowTO, protectedRoute } from "../auth/auth.controller.js";
import {
  addWishList,
  getWishList,
  removeFromWishList,
} from "./wishlist.controller.js";
import { validate } from "./../../middlewares/validate.js";
import {
  addWishListValidation,
  removeFromWishListValidation,
} from "./wishlist.validation.js";

const wishListRouter = Router();

wishListRouter.use(protectedRoute, allowTO("user", "admin"));

wishListRouter.patch("/add", validate(addWishListValidation), addWishList);
wishListRouter.get("/get", getWishList);
wishListRouter.delete(
  "/delete",
  validate(removeFromWishListValidation),
  removeFromWishList
);

export default wishListRouter;
