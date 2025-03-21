
import fs from "fs";
import path from "path";
import { getOpenAI, getPinecone, pincodeIndexName } from "./resources";

const openai = getOpenAI();
const pinecone = getPinecone();

const index = pinecone.index(pincodeIndexName());

function getMarkdownFiles(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(dir, file));
}

function splitMarkdownFile(file: string) {
  // Markdown files are arranged in subheadings, so we split on '##'
  const content = fs.readFileSync(file, "utf8");
  const sections = content.split("\n## ");
  return sections.map((section, i) => {
    return {
      id: `section-${i}`,
      content: section.trim(),
    };
  });
}

async function createEmbeddings(text: string) {
  console.log(`Creating embeddings for ${text}`);
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data[0].embedding;
}

async function processMarkdownFiles(filePath: string) {
  const files = getMarkdownFiles(filePath);
  
  files.forEach(async (file) => {
    console.log(`Processing ${file}`);
    const fileName = path.basename(file, ".md");
    const sections = splitMarkdownFile(file);

    const embeddings = await Promise.all(sections.map(async (section) => {
      const embedding = await createEmbeddings(section.content);
      return {
        id: `${fileName}-${section.id}`,
        values: embedding,
        metadata: { content: section.content, source: fileName },
      };
    }));
    console.log(`Upserting embeddings for ${fileName} to index ${pincodeIndexName()}`);
    await index.upsert(embeddings);
    console.log(`Indexed ${fileName}`);
  });
}

processMarkdownFiles(path.join(__dirname, "../data"));

