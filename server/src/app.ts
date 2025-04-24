import express, { Application } from "express";
import cors from "cors";
import config from "./config/env.config";
import routes from "./routes/routes";
import errorHandler from "./middleware/errorHandler";

const port: number = config.port;
const app: Application = express();

// Enables pre-flight across-the-board l
app.use(cors());

import "./config/passport";
import { AddressInfo } from "net";

// Parses incoming requests with JSON payloads
app.use(express.json());

// Parses form data
app.use(express.urlencoded({ extended: true }));

/* app.get("/favicon.ico", (req: Request, res: Response) => {
  res.sendStatus(204);
}); */

// Application-level
app.use("/", (req, res, next) => {
  console.log("Application-level middleware running...");
  next();
});

// curl -w "\n" -X GET http://localhost:3000/helloWorld
app.get("/helloWorld", (req, res, next) => {
  console.log("Testing");
  res.json({ msg: "hello world" });
});

// Routes
routes(app);

// No routes match
app.use((req, res, next) => {
  const error = {
    status: "fail",
    code: 404,
    data: { message: "Resource not found" },
  };

  next(error);
});

app.use(errorHandler);

// For a server listening on a pipe or Unix domain socket, the name is returned as a string.
// https://nodejs.org/dist/latest-v12.x/docs/api/net.html#net_server_address
const server = app.listen(port, () => {
  const { address, port } = server.address() as AddressInfo;
  console.log(`App running on port ${port}.`);
});

export default app;
