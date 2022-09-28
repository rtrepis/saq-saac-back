import { NextFunction, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import User from "../../../database/models/User";
import CustomError from "../../../utils/CustomError";
import { CustomRequest } from "../../types/CustomRequest";

const deleteId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { deleteSequenceId } = req.params;
  const userId = req.payload.id;

  try {
    await Sequence.findByIdAndDelete(deleteSequenceId);
    const user = await User.findById(userId);
    const newSequenceCreateList = user.sequencesCreate.filter(
      (sequencesId) => `${sequencesId}` !== deleteSequenceId
    );

    user.sequencesCreate = newSequenceCreateList;
    user.save();
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
