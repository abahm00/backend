import { Router } from "express";
import {
  addSubCategorty,
  deleteSubCategory,
  getAllSubCategories,
  updateSubCategory,
} from "./subCategory.controller.js";
import { uploadSingleFile } from "../../../upload/fileUpload.js";
import {
  addSubCategortyValidation,
  updateSubCategortyValidation,
} from "./subCategory.validation.js";
import { validate } from "./../../middlewares/validate.js";
import { allowTO, protectedRoute } from "../auth/auth.controller.js";

const subCategoryRouter = Router({ mergeParams: true });

subCategoryRouter.use(protectedRoute);

subCategoryRouter.get("/get", allowTO("user", "admin"), getAllSubCategories);
subCategoryRouter.post(
  "/add",
  uploadSingleFile("subCategory", "img"),
  validate(addSubCategortyValidation),
  allowTO("admin"),
  addSubCategorty
);
subCategoryRouter.delete("/delete/:id", allowTO("admin"), deleteSubCategory);
subCategoryRouter.put(
  "/update/:id",
  validate(updateSubCategortyValidation),
  allowTO("admin"),
  updateSubCategory
);

export default subCategoryRouter;
