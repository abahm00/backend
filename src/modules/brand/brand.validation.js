import Joi from "joi";

export const addBrandValidation = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  logo: Joi.string().required(),
});

export const updateBrandValidation = Joi.object({
  name: Joi.string().min(3).max(20),
  logo: Joi.string(),
});
