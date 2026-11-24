import { config } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export function errorMiddleware(err, req, res, next) {
  if (err instanceof AppError) {
    const body = { success: false, message: err.message, errors: err.errors };
    if (config.nodeEnv !== "production") body.stack = err.stack;
    return res.status(err.statusCode).json(body);
  }
  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "email";
    return res.status(409).json({ success: false, message: "Duplicate value", errors: [{ field, message: `${field} already exists` }] });
  }
  if (err?.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid identifier", errors: [{ field: err.path || "id", message: "Invalid value" }] });
  }
  if (err?.name === "JsonWebTokenError" || err?.name === "TokenExpiredError") {
    return res.status(401).json({ success: false, message: "Invalid credentials", errors: [] });
  }
  console.error(err);
  return res.status(500).json({ success: false, message: "Internal server error", errors: [] });
}
