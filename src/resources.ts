import dotenv from "dotenv";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";

dotenv.config();

const PINECONE_INDEX = process.env.PINECONE_INDEX;
if (!PINECONE_INDEX) {
  throw new Error("PINECONE_INDEX is not set in .env file");
}

export function getPinecone(): Pinecone {
  const pineconeApiKey = process.env.PINECONE_API_KEY;
  if (!pineconeApiKey) {
    throw new Error("PINECONE_API_KEY not found");
  }
  return new Pinecone({
    apiKey: pineconeApiKey,
  });
}

export function getOpenAI(): OpenAI {
  const openAIKey = process.env.OPENAI_API_KEY;
  if (!openAIKey) {
    throw new Error("OPENAI_API_KEY not found");
  }
  return new OpenAI({ apiKey: openAIKey });
}

export function pincodeIndexName(): string {
  const pinconeIndexName = process.env.PINECONE_INDEX;
  if (!pinconeIndexName) {
    throw new Error("PINECONE_INDEX not found");
  }
  return pinconeIndexName;
}
