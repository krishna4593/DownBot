import { AIMessage, HumanMessage } from "langchain";
import { createConversation, findConversationByIdAndUser, findConversationsByUser } from "../DAO/conversation.dao.js";
import { createMessage, findMessagesByConversation } from "../DAO/message.dao.js";
import { generateTitle } from "../services/ai/title.service.js";
import { AppError } from "../utils/AppError.js";
import model from "../services/ai/main.service.js";
import { sendSuccess } from "../utils/apiResponse.js";
import {MCPAdapter} from "@langchain/mcp-adapters"
import {createAgent} from "langchain"
import { config } from "../config/env.js";


const adapter = new MCPAdapter({
    servers:{
        tavily:{
            url:config.tavilyUrl,
        }
    }
});

const tools = await adapter.listTools();


export async function handleMessage(req,res,next){
    const {content,conversation:conversationId}=req.body;
    const user = req.user;

    let conversation = null;
    if(!conversationId){
     // Create a new conversation
     const {title} = await generateTitle(content);
     conversation = await createConversation({ user: user.id, title })
    }
    else{
        conversation = await findConversationByIdAndUser(conversationId,user.id); 
        if(!conversation){
            return next(new AppError(404,'conversation not found'))
        }
    }

    const messages = (await findMessagesByConversation(conversation.id)).map(msg=>{
        if(msg.role==="user"){
            return new HumanMessage(msg.content);
        }else if(msg.role==="assistant"){
            return new AIMessage(msg.content)
        }
        return null;
    }).filter(Boolean)

    messages.push(new HumanMessage(content));

    await createMessage({
        role:"user",
        content:content,
        conversation: conversation._id
    })

    const agent = createAgent({model, tools})

    const stream = await agent.stream({
        messages:[
            new SystemMessage(`
             -your name is downbot

             -You are a helpful assistant that provides accurate and concise information. If you don't know the answer, say 'I don't know' instead of making up an answer.`),
             ...messages
        ]
    },{
        stremMode:"messages"
    });

    //set headers for sse
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    //sent conversation through sse

    res.write(`data: ${JSON.stringify({conversationId: conversation.id, 
    title:conversation.title
    })}\n\n`);

    let aiChunk= null;

    for await(const [chunk] of stream){
        console.log(chunk);

        if(aiChunk==null) {
            aiChunk=chunk
        }else{
            aiChunk=aiChunk.concat(chunk);
        }
        res.write(`data:${JSON.stringify({chunk:chunk.content})}\n\n`)
    }

    res.end();

    await createMessage({
        role:"assistant",
        content:aiChunk.content,
        conversation:conversation._id
    });



}


export async function getAllConversations(req,res){
   const user = req.user;
   const conversations = await findConversationsByUser(user.id); 
   return sendSuccess(res,200,'Conversations fetched successfully', { conversations })
}

export async function getMessagesByConversation(req,res,next){
const {conversationId}= req.params;

const user = req.user;

const conversation = await findConversationByIdAndUser(conversationId,user.id);
if(!conversation){
    return next(new AppError(404,'Conversation not found'))
}

const messages = await findMessagesByConversation(conversationId);
return sendSuccess(res,200,'Messages fetched successfully',{messages})

}