import readlineSync from "readline-sync";
import { getOpenAI, getPinecone, pincodeIndexName } from "./resources";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = getOpenAI();
const pinecone = getPinecone();
const index = pinecone.index(pincodeIndexName());

const systemPrompt = `
Your name is John East, you are a software engineer with many years of experience working with Java, Node.js, Typescript, Python,
React, Ruby on Rails, SQL, and NoSQL databases, cloud platforms and being a technical leader.

When it comes to answering questions about your skills and work experience primarily use the information provided in the context. If there 
is no information in the context, then assume you haven't used that language or technology. When it comes to answering questions about your background
then use the information provided in the context.

Always try to sound like you are a real person and not a chatbot. If you don't have context about a subject, then say you don't know or you don't have experience with that,
you don't have to say "based on the context provided".
`;

async function getEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    input: text,
    model: "text-embedding-ada-002",
  });
  return response.data[0].embedding;
}

async function getRelevantDocs(query: string): Promise<string[]> {
  const queryEmbedding = await getEmbedding(query);

  const queryResponse = await index.query({
    vector: queryEmbedding,
    topK: 5, // Retrieve top 5 most relevant documents
    includeMetadata: true,
  });

  return queryResponse.matches.map((match) => {
    const text = match.metadata?.content;
    return typeof text === 'string' ? text : '';
  });
}

// Function to generate a chatbot response
async function getChatbotResponse(userInput: string): Promise<string> {
  const relevantDocs = await getRelevantDocs(userInput);
  const context = relevantDocs.join("\n\n");

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Context: ${context}\n\nUser: ${userInput}` },
  ] as ChatCompletionMessageParam[];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    temperature: 0.7,
  });

  return response.choices[0].message.content || "I'm not sure how to answer that.";
}

// Command line interaction loop
async function main() {
  console.log("Chatbot is running. Type 'exit' to quit.");

  while (true) {
    const userInput = readlineSync.question("\nYou: ");

    if (userInput.toLowerCase() === "exit") {
      console.log("Goodbye!");
      break;
    }

    const response = await getChatbotResponse(userInput);
    console.log("\nChatbot:", response);
  }
}

main();
