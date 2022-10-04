import { NextFunction, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import User from "../../../database/models/User";
import CustomError from "../../../utils/CustomError";
import { CustomRequest } from "../../types/CustomRequest";
import SequenceI from "../../types/interfaces";

const deleteId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userId: string = req.payload.id;

  try {
    const sequenceData: SequenceI = await Sequence.findById(id).populate(
      "owner",
      { id: true }
    );

    if (sequenceData.owner.id !== userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await Sequence.findByIdAndDelete(id);

    const user = await User.findById(userId);
    const newSequenceCreateList = user.sequencesCreate.filter(
      (sequencesId) => `${sequencesId}` !== id
    );
    user.sequencesCreate = newSequenceCreateList;
    user.save();

    res.status(200).json({ message: "Sequence has been deleted" });
  } catch (error) {
    const deleteIdError = new CustomError(
      404,
      error.message,
      "Error deleting sequences to Data Base"
    );
    next(deleteIdError);
  }
};

export default deleteId;
