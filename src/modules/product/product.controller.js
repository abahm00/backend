import { handleError } from "./../../middlewares/catchError.js";
import slugify from "slugify";
import { Product } from "../../../database/models/product.model.js";
import { Category } from "../../../database/models/category.model.js";

export const addProduct = handleError(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  let exist = await Product.findOne({ title: req.body.title });

  if (exist) {
    return next(new Error("product already exists"));
  }

  if (!req.files?.imgCover) {
    return next(new Error("imgCover file is required"));
  }

  req.body.imgCover = req.files.imgCover[0].filename;

  if (req.files.images) {
    req.body.images = req.files.images.map((file) => file.filename);
  }

  if (req.files.images) {
    req.body.images = req.files.images.map((file) => file.filename);
  }

  req.body.slug = slugify(req.body.title);
  let product = new Product(req.body);

  await product.save();

  res.json({ message: "Product added", product });
});

export const getAllProducts = handleError(async (req, res, next) => {
  let products = await Product.find().populate("createdBy");
  res.json({ products });
});

export const updateProduct = handleError(async (req, res, next) => {
  const exists = await Product.findById(req.params.id);
  if (!exists) {
    return next(new Error("doesn't exist"));
  }

  // If a new image was uploaded, replace it
  if (req.files?.imgCover) {
    req.body.imgCover = req.files.imgCover[0].filename;
  }

  // Handle slug update
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({ message: "updated", product });
});

export const deleteProduct = handleError(async (req, res, next) => {
  const exists = await Product.findById(req.params.id);
  if (!exists) {
    next(new Error("doesn't exist"));
  }
  let product = await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted", product });
});
