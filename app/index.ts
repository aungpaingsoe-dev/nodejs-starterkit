import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { join } from "node:path";
import routes from "../routes";
import { errorHandler } from "./middlewares/handlers/error.handler";
import { createServer } from "node:http";
import "./middlewares/passport/jwt-strategy";
import multer from "multer";
import loggerMiddleware from "./middlewares/logger.middleware";
dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const server = createServer(app);

// Middlewares
// Use the logger middleware
app.use(loggerMiddleware);
app.use(express.json());
app.use("/public/uploads", express.static("public/uploads"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", upload.any(), routes);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../public/index.html"));
});

// 404 Handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use(errorHandler);

export default server;
