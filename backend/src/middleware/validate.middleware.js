import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError.js";

export function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const errors = result.array().map((err) => ({ field: err.path || "field", message: err.msg }));
  throw new AppError(422, "Validation failed", errors);
}
