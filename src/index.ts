import connectDB from "./database/connectDB";
import "./loadEnvironment";
import startServer from "./server/startServer";

const port = +process.env.PORT || 4001;

const mongoURL = process.env.MONGODB_URL;

(async () => {
  try {
    await startServer(port);
    await connectDB(mongoURL);
  } catch (error) {
    process.exit(1);
  }
})();
