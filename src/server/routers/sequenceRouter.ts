import express from "express";
import { validate } from "express-validation";
import getAllSequencePublic, {
  createSequence,
} from "../controllers/sequence/sequencesController";
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

export default sequencesRouter;
