import dotenv from "dotenv";

dotenv.config();

const required = ["MONGODB_URI", "ACCESS_TOKEN_SECRET", "REFRESH_TOKEN_SECRET", "GROQ_API_KEY", "TAVILY_URL", "COHERE_API_KEY"];

for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing required environment variable: ${key}`);
}

export const config = Object.freeze({
  mongoUri: process.env.MONGODB_URI,
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  groqApiKey: process.env.GROQ_API_KEY,
  tavilyUrl: process.env.TAVILY_URL,
  cohereApiKey: process.env.COHERE_API_KEY,
});
