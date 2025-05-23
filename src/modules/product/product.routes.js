import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./product.controller.js";
import { uploadMultibleFiles } from "../../../upload/fileUpload.js";
import {
  addProductValidation,
  updateProductValidation,
} from "./product.validation.js";
import { validate } from "./../../middlewares/validate.js";
import { allowTO, protectedRoute } from "../auth/auth.controller.js";

const productRouter = Router();

productRouter.get("/get", getAllProducts);
productRouter.post(
  "/add",
  uploadMultibleFiles("product", "imgCover", "images"),
  protectedRoute,
  validate(addProductValidation),
  allowTO("admin"),
  addProduct
);
productRouter.delete(
  "/delete/:id",
  protectedRoute,
  allowTO("admin"),
  deleteProduct
);
productRouter.put(
  "/update/:id",
  protectedRoute,
  uploadMultibleFiles("product", "imgCover", "images"),
  validate(updateProductValidation),
  allowTO("admin"),
  updateProduct
);

export default productRouter;
