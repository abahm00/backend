import { Router } from "express";
import {
  addBrand,
  deleteBrand,
  getAllBrands,
  updateBrand,
} from "./brand.controller.js";
import { uploadSingleFile } from "../../../upload/fileUpload.js";
import { validate } from "./../../middlewares/validate.js";
import {
  addBrandValidation,
  updateBrandValidation,
} from "./brand.validation.js";
import { allowTO, protectedRoute } from "../auth/auth.controller.js";

const brandRouter = Router();

brandRouter.use(protectedRoute);

brandRouter.get("/get", allowTO("user", "admin"), getAllBrands);
brandRouter.post(
  "/add",
  uploadSingleFile("brand", "logo"),
  validate(addBrandValidation),
  allowTO("admin"),
  addBrand
);
brandRouter.put(
  "/update/:id",
  validate(updateBrandValidation),
  allowTO("admin"),
  updateBrand
);
brandRouter.delete("/delete/:id", allowTO("admin"), deleteBrand);

export default brandRouter;
