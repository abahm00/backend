import Joi from "joi";

export const addAddressValidation = Joi.object({
  city: Joi.string().min(2).max(100).required(),
  street: Joi.string().min(2).max(200).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be between 10 to 15 digits.",
    }),
});

export const deleteAddressValidation = Joi.object({
  city: Joi.string().min(2).max(100).required(),
  street: Joi.string().min(2).max(200).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be between 10 to 15 digits.",
    }),
});
