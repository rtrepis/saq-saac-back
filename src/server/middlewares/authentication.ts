import { NextFunction, Response } from "express";
import { verifyToken } from "../../utils/auth";
import CustomError from "../../utils/CustomError";
import { CustomRequest } from "../types/CustomRequest";

const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const customError = new CustomError(
    400,
    "invalid authentication",
    "invalid authentication"
  );

  const authenticationData = req.get("Authorization");

  if (!authenticationData || !authenticationData.startsWith("Bearer ")) {
    next(customError);
    return;
  }
  const token = authenticationData.slice(7);
  const userToken = verifyToken(token);

  if (typeof userToken === "string") {
    next(customError);
    return;
  }

  req.payload = userToken;
  next();
};

export default authentication;
