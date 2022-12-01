import { Joi } from "express-validation";

export const LoginJoi = {
  body: Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
  }),
};

export const RegisterJoi = {
  body: Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    confirmationCode: Joi.string(),
  }),
};
