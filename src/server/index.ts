import express from "express";
import morgan from "morgan";

import { generalError, notFoundError } from "./middlewares/errors";
import usersRouter from "./routers/userRouter";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use();
app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
