import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

// Middleware
app.use(morgan("dev")); // Logger
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Routes
app.use("/api", routes);

// Error handling middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  res.status(404);
  next(error);
});

app.use((error: Error, req: Request, res: Response) => {
  res.status(res.statusCode || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
