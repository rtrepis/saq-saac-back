import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import { UserData } from "../../../database/types/UsersInterfaces";
import { createToken } from "../../../utils/auth";
import CustomError from "../../../utils/CustomError";
import sendEmail from "../../email/sendEmail";

interface EmailUser {
  email: string;
}

const forgot = async (req: Request, res: Response, next: NextFunction) => {
  const debug = Debug("seqSaac:forgot");
  const appUrl = process.env.APP_URL;

  const emailUser: EmailUser = {
    email: req.body.email.toString(),
  };

  try {
    const findUser: UserData = await User.findOne({ email: emailUser.email });
    findUser.confirmationCode = await createToken(emailUser.email);
    findUser.status = "Pending";
    await User.replaceOne({ _id: findUser.id }, findUser);

    sendEmail(
      findUser.email,
      "Restaurar contrasenya",
      `<h1>Restablir de Contrasenya</h1>
        <h2>Hola ${findUser.userName}</h2>
        <p>Si us plau, pots restaurar la teva contrasenya clicant al següent enllaç</p>
        <a href=${appUrl}forgot/${findUser.confirmationCode}>Clicar  aquí</a>
        </div>`
    );

    debug(chalk.green(findUser.userName));
    res.status(200).json({ message: "Please, validate email" });
  } catch (error) {
    const forgotError = new CustomError(
      400,
      error.message,
      "Error forgot email"
    );
    next(forgotError);
  }
};

export default forgot;
