import express from "express";
import { generalError, notFoundError } from "./middlewares/errors";

const app = express();

app.use(notFoundError);
app.use(generalError);

export default app;
