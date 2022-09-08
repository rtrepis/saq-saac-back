import { NextFunction, Response } from "express";
import User from "../../../database/models/User";
import CustomError from "../../../utils/CustomError";
import { CustomRequest } from "../../types/CustomRequest";

export const getSequencesOwner = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let sequences;

  const { id } = req.payload;

  try {
    sequences = await User.findOne({
      _id: id,
    }).populate("sequencesCreate");
  } catch (error) {
    const getAllError = new CustomError(
      404,
      error.message,
      "Error getting sequences to Data Base"
    );
    next(getAllError);
  }
  res.status(200).json({ sequences });
};

export default getSequencesOwner;
