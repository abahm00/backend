import Joi from "joi";

export const addReviewValidation = Joi.object({
  product: Joi.string().hex().length(24).required(),
  rate: Joi.number().min(0).max(5).required(),
  comment: Joi.string().max(1000).optional(),
});

export const updateReviewValidation = Joi.object({
  rate: Joi.number().min(0).max(5).optional(),
  comment: Joi.string().max(1000).optional(),
}).min(1);
