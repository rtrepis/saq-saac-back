import { NextFunction, Request, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import CustomError from "../../../utils/CustomError";

const getId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const sequenceData = await Sequence.findById(id);

    if (sequenceData.private) {
      res.status(401).json({ error: "The resource is not published" });
      return;
    }

    res.status(200).json({ sequences: sequenceData });
  } catch (error) {
    const getIdError = new CustomError(
      404,
      error.message,
      "Error getting sequences to Data Base"
    );
    next(getIdError);
  }
};

export default getId;
