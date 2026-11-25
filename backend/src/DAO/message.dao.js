import { messageModel } from "../models/message.model.js";

export const createMessage = (data) => messageModel.create(data);

export const findMessageById = (id) => messageModel.findById(id);

export const findMessagesByConversation = (conversationId) =>
  messageModel.find({ conversation: conversationId });

export const findLatestMessageByConversation = (conversationId) =>
  messageModel.findOne({ conversation: conversationId });

export const deleteMessagesByConversation = (conversationId) =>
  messageModel.deleteMany({ conversation: conversationId });
