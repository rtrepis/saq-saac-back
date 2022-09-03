import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import {
  UserData,
  UserJwtPayload,
  UserLogin,
  UserRegister,
} from "../../database/types/interfaces";
import { createToken, hashCompare, hashCreator } from "../../utils/auth";
import CustomError from "../../utils/CustomError";

export const registerUser = async (
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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const debug = Debug("seqSaac:loginUser:");

  const user = req.body as UserLogin;

  const userError = new CustomError(
    403,
    "User not found",
    "User or password invalid"
  );

  let findUsers: Array<UserData>;
  try {
    findUsers = await User.find({ userName: user.userName });
  } catch (error) {
    const finalError = new CustomError(
      403,
      `name: ${(error as Error).name}; message: ${(error as Error).message}`,
      "Invalid user/password"
    );
    next(finalError);
    return;
  }

  try {
    const isPasswordValid = await hashCompare(
      user.password,
      findUsers[0].password
    );
    if (!isPasswordValid) {
      userError.message = "Invalid password";
      debug(chalk.red(findUsers[0].userName));

      next(userError);
      return;
    }
  } catch (error) {
    const finalError = new CustomError(
      403,
      `name: ${(error as Error).name}; message:  ${(error as Error).message}`,
      "Invalid user/password"
    );
    next(finalError);
    return;
  }

  const payLoad: UserJwtPayload = {
    id: findUsers[0].id,
    userName: findUsers[0].userName,
  };

  const responseUserData = {
    user: {
      token: createToken(payLoad),
    },
  };

  debug(chalk.green(findUsers[0].userName));
  res.status(200).json(responseUserData);
};
