import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import { decodeToken } from "../../../utils/auth";
import CustomError from "../../../utils/CustomError";

const verifyCode = async (req: Request, res: Response, next: NextFunction) => {
  const { confirmCode } = req.params;
  try {
    const email = decodeToken(confirmCode);

    const findUser = await User.findOne({ email });
    if (findUser.status === "Pending") {
      findUser.status = "Active";
      findUser.confirmationCode = "";
      findUser.save();
    }

    res.status(200).json({ message: "Validate email, User is active" });
  } catch (error) {
    const verifyCodeError = new CustomError(
      403,
      error.message,
      "Error verify confirmation code"
    );
    next(verifyCodeError);
  }
};

export default verifyCode;
