import { Joi } from "express-validation";

const UserJoi = {
  body: Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().email(),
  }),
};

export default UserJoi;
