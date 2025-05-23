import { Router } from "express";
import { allowTO, protectedRoute } from "../auth/auth.controller.js";
import {
  addAddress,
  deleteAddress,
  getAddresses,
} from "./addresses.controller.js";
import {
  addAddressValidation,
  deleteAddressValidation,
} from "./addresses.validation.js";
import { validate } from "./../../middlewares/validate.js";

const addressesRouter = Router();

addressesRouter.use(protectedRoute, allowTO("user", "admin"));

addressesRouter.patch("/add", validate(addAddressValidation), addAddress);
addressesRouter.get("/get", getAddresses);
addressesRouter.delete(
  "/delete",
  validate(deleteAddressValidation),
  deleteAddress
);

export default addressesRouter;
