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
  let count;
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 0;
  const page = req.query.page ? Number(req.query.page) : 0;

  try {
    sequences = await Sequence.find({ privately: false });
    count = sequences.length;

    if (pageSize !== 0 || NaN) {
      sequences = await Sequence.find({ privately: false })
        .limit(pageSize)
        .skip(pageSize * page)
        .exec();
    }
  } catch (error) {
    const getAllError = new CustomError(
      404,
      error.message,
      "Error getting sequences to Data Base"
    );
    next(getAllError);
  }
  res.status(200).json({ count, sequences });
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
