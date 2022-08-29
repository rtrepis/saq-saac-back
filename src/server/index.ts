import express from "express";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/errors";

const app = express();

app.use(morgan("dev"));

app.use(notFoundError);
app.use(generalError);

export default app;
