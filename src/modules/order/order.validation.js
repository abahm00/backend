import Joi from "joi";

export const createCashOrderValidation = Joi.object({
  city: Joi.string().min(3).max(100).required(),
  street: Joi.string().min(3).max(200).required(),
  phone: Joi.string().min(10).max(15).required(),
});

export const createCheckoutSessionValidation = Joi.object({
  city: Joi.string().min(3).max(100).required(),
  street: Joi.string().min(3).max(200).required(),
  phone: Joi.string().min(10).max(15).required(),
});
