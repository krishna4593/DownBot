import { verifyAccessToken } from "../utils/jwt.js";
import { findUserById } from "../DAO/user.dao.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) throw new AppError(401, "Invalid credentials");
  const token = header.slice(7);
  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new AppError(401, "Invalid credentials");
  }
  const user = await findUserById(payload.id);
  if (!user) throw new AppError(401, "Invalid credentials");
  req.user = user;
  next();
});
