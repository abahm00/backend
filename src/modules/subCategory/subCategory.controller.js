import slugify from "slugify";
import { SubCategory } from "./../../../database/models/subCategory.model.js";
import { handleError } from "./../../middlewares/catchError.js";

export const getAllSubCategories = handleError(async (req, res) => {
  let filterObj = {};
  if (req.params.categoryId) {
    filterObj.categoryId = req.params.categoryId;
  }

  let subCategories = await SubCategory.find({
    category: filterObj.categoryId,
  });

  res.json({ subCategories });
});

export const addSubCategorty = handleError(async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    req.body.img = req.file.filename;
    req.body.slug = slugify(req.body.name);
    let subCategory = new SubCategory(req.body);

    await subCategory.save();

    return res
      .status(201)
      .json({ message: "Subcategory added successfully", subCategory });
  } catch (error) {
    return res.status(500).json({ message: "Error adding subcategory", error });
  }
});

export const updateSubCategory = async (req, res, next) => {
  const exists = await SubCategory.findById(req.params.id);
  if (!exists) {
    next(new Error("doesn't exist"));
  }
  req.body.slug = slugify(req.body.name);
  let subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json({ message: "updated", subCategory });
};

export const deleteSubCategory = async (req, res, next) => {
  const exists = await SubCategory.findById(req.params.id);
  if (!exists) {
    next(new Error("doesn't exist"));
  }
  let subCategory = await SubCategory.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted", subCategory });
};
