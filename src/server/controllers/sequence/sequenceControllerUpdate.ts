import { NextFunction, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import CustomError from "../../../utils/CustomError";
import { CustomRequest } from "../../types/CustomRequest";
import SequenceI from "../../types/interfaces";

const updateId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userId: string = req.payload.id;
  const sequenceUpdateData: SequenceI = req.body;
  try {
    const sequenceDB: SequenceI = await Sequence.findById(id).populate(
      "owner",
      { id: true }
    );

    if (sequenceDB.owner.id !== userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const sequenceUpdated = {
      ...sequenceUpdateData,
      id: sequenceDB.id,
      owner: sequenceDB.owner,
    };

    await Sequence.replaceOne({ _id: id }, sequenceUpdated);

    res.status(200).json({ sequenceUpdated });
  } catch (error) {
    const updateIdError = new CustomError(
      404,
      error.message,
      "Error update sequence to Data Base"
    );

    next(updateIdError);
  }
};

export default updateId;
