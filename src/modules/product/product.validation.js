import Joi from "joi";

export const addProductValidation = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(5).max(1000).required(),
  imgCover: Joi.alternatives().try(Joi.object(), Joi.string()),
  images: Joi.alternatives().try(Joi.object(), Joi.array().items(Joi.string())),
  img: Joi.any().optional(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).default(0),
  category: Joi.string().hex().length(24).required(),
  subCategory: Joi.string().hex().length(24),
  brand: Joi.string().hex().length(24),
});

export const updateProductValidation = Joi.object({
  title: Joi.string().min(2).max(20),
  description: Joi.string().min(5).max(1000),
  stock: Joi.number().min(0).default(0),
  imgCover: Joi.object(),
  images: Joi.object(),
  price: Joi.number().min(0),
  category: Joi.string().hex().length(24),
  subCategory: Joi.string().hex().length(24),
  brand: Joi.string().hex().length(24),
});
