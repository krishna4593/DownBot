import mongoose from "mongoose";

export const conversationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength:100,
        default:"New Conversation"
    },
    lastMessage: {type:Date, default:null},
},
{
    timestamps: {createdAt:'createdAt', updatedAt:'lastUpdate'}
});


conversationSchema.index({user:1, lastMessage:-1});

export const conversationModel= mongoose.model("Conversation", conversationSchema);