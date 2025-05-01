import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import { AddressInfo } from "net";

import config from "./config/env.config";
import routes from "./routes/routes";
import errorHandler from "./middleware/errorHandler";
import deserializeUser from "./middleware/deserializeUser";

const port: number = config.port;
const app: Application = express();

// Parses form data
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Enables pre-flight across-the-board l
// TODO update origin for production in env.config
// app.use(cors());
// app.use(cors({ credentials: true, origin: "http://localhost:5173/" }));
// app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));
app.use(cors({ origin: true, credentials: true }));

import "./config/passport";

// Parses incoming requests with JSON payloads
app.use(express.json());

/* app.get("/favicon.ico", (req: Request, res: Response) => {
  res.sendStatus(204);
}); */

// Testing...
app.use(passport.initialize());
app.use(deserializeUser);

// Application-level
app.use("/", (req, res, next) => {
  console.log("Application-level middleware running...");
  next();
});

// Routes
routes(app);

// No paths match
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
