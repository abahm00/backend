import Joi from "joi";

export const updateUserValidation = Joi.object({
  name: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(100),
  role: Joi.string().valid("user", "admin"),
  isBlocked: Joi.boolean(),
});
