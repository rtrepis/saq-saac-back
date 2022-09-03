import "../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import app from "./index";
import CustomError from "../utils/CustomError";

const debug = Debug("seqSaac:server:startServer");

const startServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Server listening`));
      resolve(true);
    });

    server.on("error", (error: CustomError) => {
      debug(chalk.redBright("Error server error:", error.message));
      reject(error);
    });
  });

export default startServer;
