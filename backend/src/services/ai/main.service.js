import { ChatGroq } from "@langchain/groq";
import {config} from "../../config/env.js"
import {ChatOpenAI} from "@langchain/openai";

const model = new ChatOpenAI({
    model:"command-a-plus-05-2026",
    temperature:0.7,
    apiKey: config.cohereApiKey,
    configuration:{
        baseURL:"https://api.cohere.ai/compatibility/v1"
    }
})

export default model;