import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import { ResetPassword } from "../../../database/types/UsersInterfaces";
import { hashCreator } from "../../../utils/auth";
import CustomError from "../../../utils/CustomError";

const reset = async (req: Request, res: Response, next: NextFunction) => {
  const debug = Debug("seqSaac:Reset:");

  const dataReset = req.body as ResetPassword;

  try {
    const findUser = await User.findOne({ confirmationCode: dataReset.code });
    findUser.password = await hashCreator(dataReset.password);
    findUser.status = "Active";
    findUser.confirmationCode = "";
    await User.replaceOne({ _id: findUser.id }, findUser);

    debug(chalk.green(findUser.userName));
    res.status(200).json({ message: "Ok Reset password" });
  } catch (error) {
    const resetError = new CustomError(
      400,
      error.message,
      "Error reset password"
    );
    next(resetError);
  }
};

export default reset;
