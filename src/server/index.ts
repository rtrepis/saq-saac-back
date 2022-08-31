import express from "express";
import { validate } from "express-validation";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/errors";
import UserJoi from "./models/UserJoi";
import usersRouter from "./routers/usersRouter";

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", validate(UserJoi, {}, { abortEarly: false }), usersRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
