import { NextFunction, Request, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import CustomError from "../../../utils/CustomError";

const getSearch = async (req: Request, res: Response, next: NextFunction) => {
  const { word: searchWord } = req.params;

  try {
    const sequenceData = await Sequence.find({
      name: { $regex: searchWord, $options: "i" },
      privately: false,
    });

    res.status(200).json({ sequences: sequenceData });
    return;
  } catch (error) {
    const getSearchError = new CustomError(
      404,
      error.message,
      "Error getting sequence to Data Base"
    );
    next(getSearchError);
  }
};

export default getSearch;
