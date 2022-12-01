import express from "express";
import { validate } from "express-validation";
import loginUser from "../controllers/user/loginController";
import registerUser from "../controllers/user/registerController";
<<<<<<< Updated upstream
import verifyCode from "../controllers/user/verifyCode";
import UserJoi from "../models/UserJoi";
=======
import reset from "../controllers/user/resetController";
import verifyCode from "../controllers/user/verifyCodeController";
import { ForgotJoi, RegisterJoi, ResetJoi, UserJoi } from "../models/UserJoi";
>>>>>>> Stashed changes

const usersRouter = express.Router();

usersRouter.get("/email-verify/:confirmCode", verifyCode);

usersRouter.post(
  "/register",
  validate(RegisterJoi, {}, { abortEarly: false }),
  registerUser
);

usersRouter.post(
  "/login",
  validate(UserJoi, {}, { abortEarly: false }),
  loginUser
);

export default usersRouter;
