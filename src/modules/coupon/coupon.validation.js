import Joi from "joi";

export const addCouponValidation = Joi.object({
  code: Joi.string().trim().min(3).max(30).required(),
  expires: Joi.date().greater("now").required(),
  discount: Joi.number().min(1).max(100).required(),
});

export const updateCouponValidation = Joi.object({
  code: Joi.string().trim().min(3).max(30),
  expires: Joi.date().greater("now"),
  discount: Joi.number().min(1).max(100),
}).min(1);
