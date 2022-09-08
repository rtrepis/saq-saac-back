import express from "express";
import { validate } from "express-validation";
import {
  createSequence,
  getAllSequencePublic,
} from "../controllers/sequence/sequencesController";
import { getSequencesOwner } from "../controllers/sequence/sequencesControllerGetOwner";
import authentication from "../middlewares/authentication";
import SequenceJoi from "../models/SequenceJoi";

const sequencesRouter = express.Router();

sequencesRouter.get("/", getAllSequencePublic);
sequencesRouter.post(
  "/create/",
  authentication,
  validate(SequenceJoi, {}, { abortEarly: false }),
  createSequence
);
sequencesRouter.get("/owner/", authentication, getSequencesOwner);

export default sequencesRouter;
