import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./routes";
import errorMiddleware from "./middlewares/errorMiddleware";

const app: Application = express();

// Middleware
app.use(morgan("dev")); // Logger
app.use(cors({ origin: process.env.FRONT_END, credentials: true })); // Enable CORS
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(cookieParser()); // Put JWT in user's cookie

// Routes
app.use("/api", apiRouter);

// Error handling middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  res.status(404);
  next({ error });
});

app.use(errorMiddleware);

export default app;
