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
    email: Joi.string(),
    confirmationCode: Joi.string(),
  }),
};

export const ForgotJoi = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export const ResetJoi = {
  body: Joi.object({
    password: Joi.string().min(3).max(30).required(),
    code: Joi.string().min(50).required(),
  }),
};
