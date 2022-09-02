import express from "express";
import { validate } from "express-validation";
import { registerUser, loginUser } from "../controllers/userControllers";
import UserJoi from "../models/UserJoi";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validate(UserJoi, {}, { abortEarly: false }),
  registerUser
);
usersRouter.post(
  "/login",
  validate(UserJoi, {}, { abortEarly: false }),
  loginUser
);

export default usersRouter;
