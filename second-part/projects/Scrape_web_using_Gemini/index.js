import { configDotenv } from "dotenv";
import axios from "axios";
import * as cheerio from "cheerio";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChromaClient } from "chromadb";

configDotenv();

const gemini_apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(gemini_apiKey);
const model = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

const model2 = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are an AI support agent expert in providing support to users on behalf of a web page. Given the context about page content, reply the user accordingly.",
});

const chromaClient = new ChromaClient({ path: "http://localhost:8000" });
chromaClient.heartbeat();

const WEB_COLLECTION = `WEB_SCRAPED_DATA_COLLECTION-2`;

const webUrl = process.env.WEB_BASE_URL;

async function scrapeWeb(url = "") {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const pageHead = $("head").html();
  const pageBody = $("body").html();

  const internalLinks = new Set();
  const externalLinks = new Set();

  $("a").each((_, el) => {
    const link = $(el).attr("href");
    if (link === "/") return;
    if (link.startsWith("http") || link.startsWith("https")) {
      externalLinks.add(link);
    } else {
      internalLinks.add(link);
    }
  });

  const obj = {
    head: pageHead,
    body: pageBody,
    internalLinks: Array.from(internalLinks),
    externalLinks: Array.from(externalLinks),
  };

  return obj;
}

async function generateVectorEmbeddings({ text }) {
  const result = await model.embedContent(text);
  return result.embedding.values;
}

async function insertIntoDB({ embedding, url, body = "", head }) {
  const collection = await chromaClient.getOrCreateCollection({
    name: WEB_COLLECTION,
  });
  await collection.add({
    ids: [url],
    embeddings: [embedding],
    metadatas: [{ url, body, head }],
  });
}

async function ingest(url = "") {
  const { head, body, internalLinks } = await scrapeWeb(url);
  // const headEmbedding = await generateVectorEmbeddings({ text: head });
  // await insertIntoDB({ embedding: headEmbedding, url });
  const bodyEmbedding = await generateVectorEmbeddings({ text: body });
  await insertIntoDB({ embedding: bodyEmbedding, url, head, body });

  // for (const link of internalLinks) {
  //   const newUrl = `${webUrl}${link}`;
  //   await ingest(newUrl);
  // }
}

async function chat(query = "") {
  const questionEmbedding = await generateVectorEmbeddings({ text: query });
  const collection = await chromaClient.getOrCreateCollection({
    name: WEB_COLLECTION,
  });

  const collectionResult = await collection.query({
    nResults: 1,
    queryEmbeddings: questionEmbedding,
  });

  const body = collectionResult.metadatas[0]
    .map((e) => e.body)
    .filter((e) => e.trim() !== "" && !!e);
  const url = collectionResult.metadatas[0]
    .map((e) => e.url)
    .filter((e) => e.trim() !== "" && !!e);
  // console.log("Body......", body);
  // console.log("URL.....", url);
  const head = collectionResult.metadatas[0]
    .map((e) => e.head)
    .filter((e) => e.trim() !== "" && !!e);
  // console.log("Head......", head);

  const resp = model2.startChat({});

  const result1 = await resp.sendMessage(`
    Query : ${query}\n\n
    URLs: ${url.join(",")}
    Retreived Content : ${body.join(",")}
    `);

  console.log(result1.response.text());
}

chat("What is teams?");


// ingest(webUrl);
// ingest(`${webUrl}/login`);
// ingest(`${webUrl}/teams`);
