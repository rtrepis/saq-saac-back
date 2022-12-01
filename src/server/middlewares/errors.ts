import "../../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import CustomError from "../../utils/CustomError";

const debug = Debug("seqSaac:errors");

export const notFoundError = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const errorCode = error.statusCode ?? 500;
  let errorMessage = error.publicMessage ?? "Internal Server Error";
  debug(chalk.red(error.message));

  if (error instanceof ValidationError) {
    errorMessage = "Validation error";
    error.details.body.forEach((element) => {
      debug(chalk.red(element.message));
    });
  }

  res.status(errorCode).json({ error: errorMessage });
};
