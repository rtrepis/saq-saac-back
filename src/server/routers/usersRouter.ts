import express from "express";
import { validate } from "express-validation";
import loginUser from "../controllers/user/loginController";
import registerUser from "../controllers/user/registerController";
import { RegisterJoi, LoginJoi } from "../models/UserJoi";

const usersRouter = express.Router();

usersRouter.get("/email-verify/:confirmCode");

usersRouter.post(
  "/register",
  validate(RegisterJoi, {}, { abortEarly: false }),
  registerUser
);

usersRouter.post(
  "/login",
  validate(LoginJoi, {}, { abortEarly: false }),
  loginUser
);

export default usersRouter;
