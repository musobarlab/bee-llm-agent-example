import "dotenv/config.js";
import { BeeAgent } from "bee-agent-framework/agents/bee/agent";
import { FrameworkError } from "bee-agent-framework/errors";
import { getEnv, parseEnv } from "bee-agent-framework/internals/env";
import { TokenMemory } from "bee-agent-framework/memory/tokenMemory";
import { OpenMeteoTool } from "bee-agent-framework/tools/weather/openMeteo";
import { getChatLLM } from "./helpers/llm.js";
import { getPrompt } from "./helpers/prompt.js";
import { WikipediaTool } from "bee-agent-framework/tools/search/wikipedia";
import { GoogleSearchTool } from "bee-agent-framework/tools/search/googleSearch";
import { DuckDuckGoSearchTool } from "bee-agent-framework/tools/search/duckDuckGoSearch";

const llm = getChatLLM();
const agent = new BeeAgent({
  llm,
  memory: new TokenMemory({ llm }),
  tools: [new GoogleSearchTool({ apiKey: getEnv('GOOGLE_SEARCH_API_KEY'), cseId: getEnv('GOOGLE_SEARCH_CSE_ID'), maxResults: 5 })],
  // tools: [new DuckDuckGoSearchTool()],
});

try {
  const prompt = getPrompt(`What is the current weather in Las Vegas?`);
  console.info(`User 👤 : ${prompt}`);

  const response = await agent
    .run(
      { prompt },
      {
        execution: {
          maxIterations: 2,
          maxRetriesPerStep: 3,
          totalMaxRetries: 10,
        },
      },
    )
    .observe((emitter) => {
      emitter.on("update", (data) => {
        console.info(`Agent 🤖 (${data.update.key}) : ${data.update.value}`);
      });
    });
  console.info(`Agent 🤖, done : ${response.result.text}`);
} catch (error) {
  console.error(FrameworkError.ensure(error).dump());
}
