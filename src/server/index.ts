import express from "express";
import morgan from "morgan";
import cors from "cors";
import { generalError, notFoundError } from "./middlewares/errors";
import usersRouter from "./routers/usersRouter";
import sequencesRouter from "./routers/sequenceRouter";

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/sequences", sequencesRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
