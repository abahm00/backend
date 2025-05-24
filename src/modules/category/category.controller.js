import slugify from "slugify";
import { Category } from "../../../database/models/category.model.js";

export const addCategorty = async (req, res) => {
  req.body.createdBy = req.user._id;
  req.body.img = req.file.filename;
  req.body.slug = slugify(req.body.name);
  let category = new Category(req.body);
  await category.save();

  res.json({ message: "category added", category });
};

export const getAllCategories = async (req, res) => {
  let categories = await Category.find();
  res.json({ categories });
};

export const updateCategory = async (req, res) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }

  if (req.file) {
    req.body.img = req.file.filename;
  }

  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({ message: "updated", category });
};

export const deleteCategory = async (req, res) => {
  let category = await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted", category });
};
