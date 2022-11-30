import express from "express";
import { validate } from "express-validation";
import forgot from "../controllers/user/forgotController";
import loginUser from "../controllers/user/loginController";
import registerUser from "../controllers/user/registerController";
import reset from "../controllers/user/resetController";
import verifyCode from "../controllers/user/verifyCodeController";
import { ForgotJoi, ResetJoi, UserJoi } from "../models/UserJoi";

const usersRouter = express.Router();

usersRouter.put("/reset", validate(ResetJoi, {}, { abortEarly: false }), reset);

usersRouter.put(
  "/forgot",
  validate(ForgotJoi, {}, { abortEarly: false }),
  forgot
);

usersRouter.get("/email-verify/:confirmCode", verifyCode);

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
