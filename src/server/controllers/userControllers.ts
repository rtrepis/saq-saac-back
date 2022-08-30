import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import { UserRegister } from "../../database/types/interfaces";
import { hashCreator } from "../../utils/auth";
import CustomError from "../../utils/CustomError";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserRegister = req.body;

    const newUser = await User.create(user);
    user.password = await hashCreator(user.password);

    res.status(201).json({ user: newUser });
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
