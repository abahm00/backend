import Joi from "joi";

export const addSubCategortyValidation = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  img: Joi.string().required(),
});

export const updateSubCategortyValidation = Joi.object({
  name: Joi.string().min(3).max(20),
  img: Joi.string(),
});
