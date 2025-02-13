import { configDotenv } from "dotenv";
import { tool } from "@langchain/core/tools";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { z } from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
} from "@langchain/core/messages";

configDotenv();


const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-1.5-flash",
  maxOutputTokens: 2048,
});

// Define arithmetic tools
const multiply = tool(
  async ({ a, b }) => {
    console.log(`🧮 Performing multiplication: ${a} X ${b}`);
    return a * b;
  },
  {
    name: "multiply",
    description: "Multiplies two numbers",
    schema: z.object({
      a: z.number().describe("First number"),
      b: z.number().describe("Second number"),
    }),
  }
);

const add = tool(
  async ({ a, b }) => {
    console.log(`🧮 Performing addition: ${a} + ${b}`);
    return a + b;
  },
  {
    name: "add",
    description: "Adds two numbers",
    schema: z.object({
      a: z.number().describe("First number"),
      b: z.number().describe("Second number"),
    }),
  }
);

const divide = tool(
  async ({ a, b }) => {
    console.log(`🧮 Performing subtraction: ${a} / ${b}`);
    return b !== 0 ? a / b : "Division by zero error";
  },
  {
    name: "divide",
    description: "Divides two numbers",
    schema: z.object({
      a: z.number().describe("First number"),
      b: z.number().describe("Second number"),
    }),
  }
);

const tools = [multiply, add, divide];
const toolsByName = Object.fromEntries(tools.map((t) => [t.name, t]));
const llmWithTools = llm.bindTools(tools);

// First Node: Calls LLM
async function llmCall(state) {
  const messages = [
    new SystemMessage(
      "You are an AI assistant that can perform arithmetic operations."
    ),
    ...state.messages,
  ];

  // console.log("🚀 Sending to Gemini:", JSON.stringify(messages, null, 2));

  try {
    const result = await llmWithTools.invoke(messages);

    // console.log("✅ Response from LLM:", result);

    return {
      messages: [
        ...state.messages,
        result, // 🔥 Add the entire AIMessage to retain tool calls
      ],
    };
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    throw error;
  }
}


// Second Node: Handles Tool Execution
async function toolNode(state) {
  // console.log(
  //   "🔄 Entering toolNode with state:",
  //   JSON.stringify(state, null, 2)
  // );

  const results = [...state.messages]; // Copy existing messages
  const lastMessage = state.messages.at(-1);

  if (!(lastMessage instanceof AIMessage) || !lastMessage.tool_calls?.length) {
    console.warn("⚠️ No tool calls detected!");
    return { messages: results };
  }

  for (const toolCall of lastMessage.tool_calls) {
    // console.log(`🔧 Tool Detected: ${toolCall.name} with args`, toolCall.args);

    if (!toolsByName[toolCall.name]) {
      console.error(`🚨 Tool not found: ${toolCall.name}`);
      continue;
    }

    const tool = toolsByName[toolCall.name];

    try {
      // console.log(`⚙️ Executing ${toolCall.name} with`, toolCall.args);
      const observation = await tool.invoke(toolCall.args);

      if (observation === undefined) {
        console.error(`❌ Tool ${toolCall.name} returned undefined!`);
        continue;
      }

      // console.log(`✅ Tool Output: ${observation}`);

      results.push(
        new AIMessage({
          content: `Result: ${observation}`,
        })
      );
    } catch (error) {
      console.error(`🔥 Error executing tool ${toolCall.name}:`, error);
    }
  }

  // console.log("📤 Returning messages:", JSON.stringify(results, null, 2));
  return { messages: results };
}



// Conditional function to determine next step
function shouldContinue(state) {
  const lastMessage = state.messages.at(-1);

  if (lastMessage instanceof AIMessage && lastMessage.tool_calls?.length) {
    return "Action"; // Call tool
  }

  return "__end__"; // Stop execution
}


// Building the workflow
const agentBuilder = new StateGraph(MessagesAnnotation)
  .addNode("llmCall", llmCall)
  .addNode("tools", toolNode)
  .addEdge("__start__", "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, {
    Action: "tools",
    __end__: "__end__",
  })
  .addEdge("tools", "llmCall")
  .compile();

// Running the agent
const result = await agentBuilder.invoke({
  messages: [new HumanMessage("Add 3 and 4 and multiply 10 to it")],
});



console.log("AI : ",result.messages[result.messages.length-2].content);

