import Joi from "joi";

export const addToCartValidation = Joi.object({
  product: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().positive().required(),
});

export const updateQuantityValidation = Joi.object({
  product: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).required(),
});

export const removeFromCartValidation = Joi.object({
  product: Joi.string().hex().length(24).required(),
});

export const applyCouponValidation = Joi.object({
  code: Joi.string().alphanum().max(30).required(),
});
