import express from "express";
import getAllSequence from "../controllers/sequence/sequencesController";

const sequencesRouter = express.Router();

sequencesRouter.get("/", getAllSequence);

export default sequencesRouter;
