# Virtual Me Training

This repo provides data that is used to populate a Pinecone vector database. The results from querying the Pinecone
index can then be used as text embeddings in the OpenAI powered chat on https://johneast.dev

## Getting started

Install the dependencies through npm

```
npm install
```

Once the dependencies are installed, run the build

```
npm run build
```

## API Keys

The necessary API keys are provided through the environment. The environment variables required are:

```
PINECONE_API_KEY
OPENAI_API_KEY
PINECONE_INDEX
```

## Data format

The data used to create embeddings and is provided in the `data` folder (not included in this repo) in markdown files. The data is arranged by sub-headings. So when uploading, the files are split on `## ` (markdown heading 2), converted to an openAI text embedding and uploaded to the pinecone index. An example of a file might look like this:

```
## Who are you?
I'm a software engineer with a passion for building great products, solving complex problems, and learning new things. As much as I enjoy working with tech, I also love colloborating with people, especially if I can encourage and help junior team members grow.

## What do you do for fun?
During the winter I enjoy snowboarding. My partner (who is an avid skier) and I try to get away to the mountains as much as possible. We've been fortunate in the past that we've both had remote jobs that allow us to work whilst also travelling to the mountains.
During the summer I enjoy playing tennis. I'm not very good but I do enjoy it.
```

All markdown files are found in the `data` folder so multiple files can be used to provide logical groupings of information.

## Uploading

Once the files are ready, they can be uploaded to Pinecone using the command

```
npm run upload
```

## Chat testing

Once uploaded the chat can be tested using the cli chat interface. To run that, use the command

```
npm run chat
```
