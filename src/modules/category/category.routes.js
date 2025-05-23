import { Router } from "express";
import {
  addCategorty,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "./category.controller.js";
import { uploadSingleFile } from "../../../upload/fileUpload.js";
import { validate } from "./../../middlewares/validate.js";
import {
  addCategortyValidation,
  updateCategortyValidation,
} from "./category.validation.js";
import subCategoryRouter from "./../subCategory/subCategory.routes.js";
import { allowTO, protectedRoute } from "../auth/auth.controller.js";

const categoryRouter = Router();

categoryRouter.use("/:categoryId/subCategory", subCategoryRouter);
categoryRouter.post(
  "/add",
  protectedRoute,
  uploadSingleFile("category", "img"),
  validate(addCategortyValidation),
  allowTO("admin"),
  addCategorty
);
categoryRouter.get("/get", getAllCategories);
categoryRouter.put(
  "/update/:id",
  protectedRoute,
  validate(updateCategortyValidation),
  allowTO("admin"),
  uploadSingleFile("category", "img"),
  updateCategory
);
categoryRouter.delete(
  "/delete/:id",
  protectedRoute,
  allowTO("admin"),
  deleteCategory
);

export default categoryRouter;
