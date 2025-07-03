import cors from "cors";
import express, { Application, Request, Response } from "express";
import pathNotFoundErrorHandler from "./app/errors/pathNotFoundErrorHandler";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routers/router";

const app: Application = express();

// CORS configuration to allow any website
app.use(
  cors({
    origin: "*", // Allow any origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow all HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allow common headers
    credentials: false, // Disable credentials for security when using "*"
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management Server is running!");
});

app.use(globalErrorHandler);
app.use(pathNotFoundErrorHandler);

export default app;
