import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import config from "./config/config";
import routes from "./routes/routes";
import errorHandler from "./middleware/errorHandler";

const port: number = config.port;
const app: Application = express();

// Enables pre-flight across-the-board l
app.use(cors());

import "./config/passport";

// Parses incoming requests with JSON payloads
app.use(express.json());

// Parses form data
app.use(express.urlencoded({ extended: true }));

/* app.get("/favicon.ico", (req: Request, res: Response) => {
  res.sendStatus(204);
}); */

// Application-level
app.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("Application-level middleware running...");
  next();
});

// curl -w "\n" -X GET http://localhost:3000/helloWorld
app.get("/helloWorld", (req: Request, res: Response, next: NextFunction) => {
  console.log("Testing");
  res.json({ msg: "hello world" });
});

// Routes
routes(app);

// No routes match
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = {
    status: 404,
    message: "Resource not found",
  };

  next(error);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

export default app;
