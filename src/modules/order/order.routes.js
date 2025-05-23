import { Router } from "express";
import {
  createCashOrder,
  createCheckoutSession,
  getOrderHistory,
} from "./order.controller.js";
import { allowTO, protectedRoute } from "../auth/auth.controller.js";
import {
  createCashOrderValidation,
  createCheckoutSessionValidation,
} from "./order.validation.js";
import { validate } from "./../../middlewares/validate.js";

const orderRouter = Router();

orderRouter.use(protectedRoute, allowTO("user", "admin"));

orderRouter.post(
  "/create/:id",
  validate(createCashOrderValidation),
  createCashOrder
);
orderRouter.post(
  "/checkout/:id",
  validate(createCheckoutSessionValidation),
  createCheckoutSession
);
orderRouter.get("/history", getOrderHistory);

export default orderRouter;
