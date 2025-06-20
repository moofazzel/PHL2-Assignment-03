import cors from "cors";
import express, { Application, Request, Response } from "express";
import pathNotFoundErrorHandler from "./app/errors/pathNotFoundErrorHandler";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routers/router";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management Server is running!");
});

app.use(globalErrorHandler);
app.use(pathNotFoundErrorHandler);

export default app;
