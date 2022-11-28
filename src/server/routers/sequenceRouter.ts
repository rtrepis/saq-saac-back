import express from "express";
import { validate } from "express-validation";
import {
  createSequence,
  getAllSequencePublic,
} from "../controllers/sequence/sequencesController";
import { getSequencesOwner } from "../controllers/sequence/sequencesControllerGetOwner";
import getId from "../controllers/sequence/sequencesControllerGetId";
import authentication from "../middlewares/authentication";
import SequenceJoi from "../models/SequenceJoi";
import deleteId from "../controllers/sequence/sequencesControllerDeleteId";
import updateId from "../controllers/sequence/sequenceControllerUpdate";
import getSearch from "../controllers/sequence/sequencesControllerSearch";

const sequencesRouter = express.Router();

sequencesRouter.get("/", getAllSequencePublic);

sequencesRouter.post(
  "/create/",
  authentication,
  validate(SequenceJoi, {}, { abortEarly: false }),
  createSequence
);

sequencesRouter.get("/owner/", authentication, getSequencesOwner);

sequencesRouter.get("/:id", getId);

sequencesRouter.delete("/delete/:id", authentication, deleteId);

sequencesRouter.put(
  "/update/:id",
  authentication,
  validate(SequenceJoi, {}, { abortEarly: false }),
  updateId
);
sequencesRouter.get("/search/:word", getSearch);

export default sequencesRouter;
