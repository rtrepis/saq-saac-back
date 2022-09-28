import { NextFunction, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import { verifyToken } from "../../../utils/auth";
import CustomError from "../../../utils/CustomError";
import { CustomRequest } from "../../types/CustomRequest";

const getId = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id: idSequence } = req.params;

  try {
    const sequenceData = await Sequence.findById(idSequence).populate("owner", {
      id: true,
    });

    if (sequenceData.private) {
      const userIdError = new CustomError(
        404,
        "not authorized by this resource",
        "not authorized by this resource"
      );

      const authenticationData = req.get("Authorization");
      const token = authenticationData.slice(7);
      const userToken = verifyToken(token);
      if (typeof userToken === "string") {
        next(userIdError);
        return;
      }

      if (userToken.id === sequenceData.owner.id) {
        res.status(200).json({ sequences: sequenceData });
        return;
      }

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
