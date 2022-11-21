import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import CustomError from "../../../utils/CustomError";

const verifyCode = async (req: Request, res: Response, next: NextFunction) => {
  const { confirmCode } = req.params;

  try {
    const findUser = await User.findOne({ confirmationCode: confirmCode });

    findUser.status = "Active";
    findUser.save();

    res.status(200).json({ message: "Validate email, User is active" });
  } catch (error) {
    const verifyCodeError = new CustomError(
      400,
      "Verify code not found",
      "Error code"
    );
    next(verifyCodeError);
  }
};

export default verifyCode;
