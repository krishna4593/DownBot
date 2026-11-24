import { createUser, findUserByEmail, findUserByIdWithRefreshToken, updateRefreshToken, clearRefreshToken } from "../DAO/user.dao.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { config } from "../config/env.js";

export function toPublicUser(user) {
  return { id: user._id.toString(), name: user.name, email: user.email };
}

function tokenPair(user) {
  const payload = { id: user._id.toString(), email: user.email };
  return { accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) };
}

function setRefreshCookie(res, token) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/v1/auth",
  });
}

export const register = asyncHandler(async (req, res) => {
  const user = await createUser(req.body);
  const tokens = tokenPair(user);
  await updateRefreshToken(user._id, tokens.refreshToken);
  setRefreshCookie(res, tokens.refreshToken);
  sendSuccess(res, 201, "Registration successful", { accessToken: tokens.accessToken, user: toPublicUser(user) });
});

export const login = asyncHandler(async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (!user || !(await user.comparePassword(req.body.password))) throw new AppError(401, "Invalid credentials");
  const tokens = tokenPair(user);
  await updateRefreshToken(user._id, tokens.refreshToken);
  setRefreshCookie(res, tokens.refreshToken);
  sendSuccess(res, 200, "Login successful", { accessToken: tokens.accessToken, user: toPublicUser(user) });
});

export const refresh = asyncHandler(async (req, res) => {
  const cookieToken = req.cookies.refreshToken;
  if (!cookieToken) throw new AppError(401, "Invalid credentials");
  let payload;
  try {
    payload = verifyRefreshToken(cookieToken);
  } catch {
    throw new AppError(401, "Invalid credentials");
  }
  const user = await findUserByIdWithRefreshToken(payload.id);
  if (!user || user.refreshToken !== cookieToken) throw new AppError(401, "Invalid credentials");
  const tokens = tokenPair(user);
  await updateRefreshToken(user._id, tokens.refreshToken);
  setRefreshCookie(res, tokens.refreshToken);
  sendSuccess(res, 200, "Token refreshed", { accessToken: tokens.accessToken, user: toPublicUser(user) });
});

export const logout = asyncHandler(async (req, res) => {
  const cookieToken = req.cookies.refreshToken;
  if (cookieToken) {
    try {
      const payload = verifyRefreshToken(cookieToken);
      await clearRefreshToken(payload.id);
    } catch {}
  }
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict", secure: config.nodeEnv === "production", path: "/api/v1/auth" });
  sendSuccess(res, 200, "Logout successful", null);
});

export const me = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, "User profile", toPublicUser(req.user));
});
