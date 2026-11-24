import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export function signAccessToken(payload) {
  return jwt.sign(payload, config.accessTokenSecret, { expiresIn: "15m" });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, config.refreshTokenSecret, { expiresIn: "7d" });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, config.accessTokenSecret);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, config.refreshTokenSecret);
}
