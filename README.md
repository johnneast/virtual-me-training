# Virtual Me Training

This repository provides data used to populate a Pinecone vector database. The results from querying the Pinecone index can be utilized as text embeddings in the OpenAI-powered chat on https://johneast.dev.

## Getting Started

Install the dependencies using npm:

```
npm install
```

After installing the dependencies, execute the build:

```
npm run build
```

## API Keys

The required API keys are supplied through environment variables. The necessary environment variables are:

```
PINECONE_API_KEY
OPENAI_API_KEY
PINECONE_INDEX
```

## Data Format

The data used to create embeddings is located in the `data` folder (not included in this repository) in markdown files. The data is organized by sub-headings. When uploading, the files are split at `## ` (markdown heading 2), converted to an OpenAI text embedding, and uploaded to the Pinecone index. An example file might look like this:

```
## Who are you?
I'm a software engineer with a passion for building great products, solving complex problems, and learning new things. As much as I enjoy working with tech, I also love colloborating with people, especially if I can encourage and help junior team members grow.

## What do you do for fun?
During the winter I enjoy snowboarding. My partner (who is an avid skier) and I try to get away to the mountains as much as possible. We've been fortunate in the past that we've both had remote jobs that allow us to work whilst also travelling to the mountains.
During the summer I enjoy playing tennis. I'm not very good but I do enjoy it.
```

All markdown files are stored in the `data` folder, enabling multiple files to provide logical groupings of information.

## Uploading

Once the files are prepared, they can be uploaded to Pinecone using the command:

```
npm run upload
```

## Chat testing

After uploading, the chat can be tested using the CLI chat interface. To run it, use the command:

```
npm run chat
```
