import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index.routes.js";
import { config } from "./config/env.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(config.nodeEnv === "development" ? "dev" : "combined"));
app.use("/api/v1", routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
