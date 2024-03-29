import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import {
  UserData,
  UserJwtPayload,
  UserLogin,
} from "../../../database/types/UsersInterfaces";
import { createToken, hashCompare } from "../../../utils/auth";
import CustomError from "../../../utils/CustomError";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const debug = Debug("seqSaac:loginUser:");
  const user = req.body as UserLogin;

  const userError = new CustomError(
    403,
    "User not found",
    "User or password invalid"
  );
  const userPending = new CustomError(
    403,
    "User pending",
    "verify email, please"
  );

  let findUsers: Array<UserData>;
  try {
    findUsers = await User.find({ userName: user.userName });

    if (findUsers[0].status === "Pending") {
      debug(chalk.green(`${findUsers[0].userName}`));
      next(userPending);
      return;
    }
  } catch (error) {
    const finalError = new CustomError(
      403,
      `name: ${(error as Error).name}; message: ${(error as Error).message}`,
      "Invalid user or password"
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
      debug(chalk.red(`${findUsers[0].userName}: ${userError.message}`));
      next(userError);
      return;
    }
  } catch (error) {
    const finalError = new CustomError(
      403,
      `name: ${(error as Error).name}; message:  ${(error as Error).message}`,
      "Invalid user or password"
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

export default loginUser;
