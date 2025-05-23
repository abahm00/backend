import { Brand } from "../../../database/models/brand.model.js";
import { handleError } from "./../../middlewares/catchError.js";
import slugify from "slugify";

export const addBrand = handleError(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "logo file is required" });
  }

  req.body.logo = req.file.filename;
  req.body.slug = slugify(req.body.name);
  req.body.createdBy = req.user._id;

  const existing = await Brand.findOne({ name: req.body.name });
  if (existing) {
    return res.status(400).json({ message: "Brand name already exists" });
  }

  const brand = await new Brand(req.body).save();
  res.json({ message: "brand added", brand });
});

export const getAllBrands = handleError(async (req, res) => {
  let brands = await Brand.find();
  res.json({ brands });
});

export const updateBrand = async (req, res, next) => {
  const exists = await Brand.findById(req.params.id);
  if (!exists) {
    next(new Error("doesn't exist"));
  }
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "updated", brand });
};

export const deleteBrand = async (req, res, next) => {
  const exists = await Brand.findById(req.params.id);
  if (!exists) {
    next(new Error("doesn't exist"));
  }
  let brand = await Brand.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted", brand });
};
