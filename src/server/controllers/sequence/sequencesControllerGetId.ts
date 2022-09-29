import { NextFunction, Request, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import { verifyToken } from "../../../utils/auth";
import CustomError from "../../../utils/CustomError";

const getId = async (req: Request, res: Response, next: NextFunction) => {
  const { id: idSequence } = req.params;

  try {
    const sequenceData = await Sequence.findById(idSequence).populate("owner", {
      id: true,
    });

    if (sequenceData.privately) {
      const authenticationData = req.get("Authorization");
      if (authenticationData !== "Bearer null") {
        const verifyTokenError = new CustomError(
          500,
          "Server internal Error",
          "Server internal Error"
        );

        const token = authenticationData.slice(7);
        const userToken = verifyToken(token);

        if (typeof userToken === "string") {
          next(verifyTokenError);
          return;
        }

        if (userToken.id === sequenceData.owner.id) {
          res.status(200).json({ sequences: sequenceData });
          return;
        }
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
