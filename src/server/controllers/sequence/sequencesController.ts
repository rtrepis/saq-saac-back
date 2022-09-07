import { NextFunction, Request, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import CustomError from "../../../utils/CustomError";
import { CustomRequest } from "../../types/CustomRequest";

const getAllSequencePublic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let sequences;

  try {
    sequences = await Sequence.find({ private: false });
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

export const createSequence = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const sequenceData = req.body;

  try {
    const newSequence = await Sequence.create(sequenceData);

    res.status(201).json({ sequence: newSequence });
  } catch (error) {
    const customError = new CustomError(
      400,
      error.message,
      "Error creating new Sequence"
    );
    next(customError);
  }
};
export default getAllSequencePublic;
