import { Request, Response } from "express";
import Sequence from "../../../database/models/Sequence";

const getAllSequence = async (req: Request, res: Response) => {
  const sequences = await Sequence.find({ private: false });
  res.status(200).json({ sequences });
};

export default getAllSequence;
