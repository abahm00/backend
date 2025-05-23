import { Router } from "express";
import {
  addReview,
  deleteReview,
  getAllReviews,
  updateReview,
} from "./review.controller.js";
import { allowTO, protectedRoute } from "../auth/auth.controller.js";
import {
  addReviewValidation,
  updateReviewValidation,
} from "./review.validation.js";
import { validate } from "../../middlewares/validate.js";

const reviewRouter = Router();

reviewRouter.use(protectedRoute, allowTO("user", "admin"));

reviewRouter.post("/add", validate(addReviewValidation), addReview);
reviewRouter.get("/get/:id", getAllReviews);
reviewRouter.put("/update/:id", validate(updateReviewValidation), updateReview);
reviewRouter.delete("/delete/:id", deleteReview);

export default reviewRouter;
