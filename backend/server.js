import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todo.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

// Load environmental configuration
dotenv.config();

const app = express();

// Establish Database connection
connectDB();

// Global Middleware Stack
app.use(cors());
app.use(express.json()); // Body parser

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Network requests logger
}

// API Routes Mounting
app.use("/api/todos", todoRoutes);

// Fallback Route handler for 404 Route Exceptions
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot execute ${req.method} on requested route: ${req.originalUrl}`,
  });
});

// Centralized Middleware Pipeline Handling Errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Production server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
