import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import { UserRegister } from "../../../database/types/UsersInterfaces";
import { createToken, hashCreator } from "../../../utils/auth";
import CustomError from "../../../utils/CustomError";
import sendEmail from "../../email/sendEmail";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const debug = Debug("seqSaac:registerUser:");
  const appUrl = process.env.APP_URL;

  const errorEmailDuplicate = new CustomError(
    403,
    "email duplicate",
    "invalid register"
  );

  try {
    const user: UserRegister = req.body;

    if ((await (await User.find({ email: req.body.email })).length) > 0) {
      next(errorEmailDuplicate);
      return;
    }
    user.password = await hashCreator(user.password);
    user.confirmationCode = await createToken(user.email);
    await User.create(user);

    debug(chalk.green(user.userName));

    sendEmail(
      user.email,
      "Verificació del correu electorònic",
      `<h1>Correu de confirmació</h1>
        <h2>Hola ${user.userName}</h2>
        <p>Si us plau, confirma el teu correu electrònic clicant al següent enllaç</p>
        <a href=${appUrl}email-verify/${user.confirmationCode}>Clicar  aquí</a>
        </div>`
    );

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
