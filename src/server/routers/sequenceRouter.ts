import express from "express";
import getAllSequencePublic, {
  createSequence,
} from "../controllers/sequence/sequencesController";

const sequencesRouter = express.Router();

sequencesRouter.get("/", getAllSequencePublic);
sequencesRouter.post("/create/", createSequence);

export default sequencesRouter;
