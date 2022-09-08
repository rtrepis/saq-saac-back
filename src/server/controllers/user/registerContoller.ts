import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import { UserRegister } from "../../../database/types/UsersInterfaces";
import { hashCreator } from "../../../utils/auth";
import CustomError from "../../../utils/CustomError";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const debug = Debug("seqSaac:registerUser:");

  try {
    const user: UserRegister = req.body;

    user.password = await hashCreator(user.password);
    await User.create(user);

    debug(chalk.green(user.userName));
    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    const customError = new CustomError(
      400,
      error.message,
      "Error creating new user"
    );

    next(customError);
  }
};

export default registerUser;
