import "../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import app from "./index";

const debug = Debug("seq-saac:server:startServer");

const startServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Server listening on http://localhost:${port}`));
      resolve(true);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error starting the server"));
      reject(error);
    });
  });

export default startServer;
