import { NextFunction, Request, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import User from "../../../database/models/User";
import CustomError from "../../../utils/CustomError";
import { CustomRequest } from "../../types/CustomRequest";

export const getAllSequencePublic = async (
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
  sequenceData.owner = req.payload.id;

  try {
    const newSequence = await Sequence.create(sequenceData);
    const user = await User.findById(newSequence.owner);
    user.sequencesCreate.push(newSequence.id);
    user.save();

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
