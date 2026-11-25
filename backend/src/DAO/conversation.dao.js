import { conversationModel } from "../models/conversation.model.js";

export const createConversation = (data) => conversationModel.create(data);

export const findConversationById = (id) => conversationModel.findById(id);

export const findConversationByIdAndUser = (id, userId) =>
  conversationModel.findOne({ _id: id, user: userId });

export const findConversationsByUser = (userId) =>
  conversationModel.find({ user: userId });

export const updateConversationLastMessage = (id, lastMessage = new Date()) =>
  conversationModel.findByIdAndUpdate(id, { lastMessage }, { new: true });

export const deleteConversationByIdAndUser = (id, userId) =>
  conversationModel.findOneAndDelete({ _id: id, user: userId });
