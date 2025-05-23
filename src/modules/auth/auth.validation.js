import Joi from "joi";

const strongPasswordPattern = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{8,}$"
);

export const registerValidation = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters.",
    "string.max": "Name must be less than 30 characters.",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please enter a valid email address.",
  }),

  password: Joi.string().pattern(strongPasswordPattern).required().messages({
    "string.empty": "Password is required.",
    "string.pattern.base":
      "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please enter a valid email address.",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),
});

export const changePasswordValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please enter a valid email address.",
  }),
  oldPassword: Joi.string().required().messages({
    "string.empty": "Old password is required.",
  }),

  newPassword: Joi.string()
    .pattern(strongPasswordPattern)
    .required()
    .invalid(Joi.ref("oldPassword"))
    .messages({
      "string.empty": "New password is required.",
      "string.pattern.base":
        "New password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      "any.invalid": "New password must be different from old password.",
    }),

  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({
      "any.only": "Confirm password must match new password.",
      "string.empty": "Confirm password is required.",
    }),
});

export const forgotPasswordValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please enter a valid email address.",
  }),

  newPassword: Joi.string()
    .pattern(strongPasswordPattern)
    .required()
    .invalid(Joi.ref("oldPassword"))
    .messages({
      "string.empty": "New password is required.",
      "string.pattern.base":
        "New password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      "any.invalid": "New password must be different from old password.",
    }),

  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({
      "any.only": "Confirm password must match new password.",
      "string.empty": "Confirm password is required.",
    }),
});
