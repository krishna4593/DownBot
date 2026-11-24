import { User } from "../models/user.model.js";

export const createUser = (data) => User.create(data);
export const findUserByEmail = (email) => User.findOne({ email }).select("+password");
export const findUserById = (id) => User.findById(id);
export const findUserByIdWithRefreshToken = (id) => User.findById(id).select("+refreshToken");
export const updateRefreshToken = (id, refreshToken) => User.findByIdAndUpdate(id, { refreshToken }, { new: true }).select("+refreshToken");
export const clearRefreshToken = (id) => User.findByIdAndUpdate(id, { refreshToken: null }, { new: true });
