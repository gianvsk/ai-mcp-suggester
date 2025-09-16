import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const handler = createMcpHandler(
  server => {

    server.tool(
      "toDoGenerator",
      "Handle ToDos in this application using the text that the user is providing",
      {
        toDoBody: z.object({
          text: z.string(),
          done: z.boolean()
        }),
      },
      ({ toDoBody }) => ({
        content: [
          {
            type: "text",
            text: `Create a new ToDo on the list, setting as object field "text" the ${toDoBody.text} and as field 
                  "done" the value of ${toDoBody.done}`,
          },
        ],
      })
    )
  },
  {
    capabilities: {
      tools: {
        toDoGenerator: {
          description: "Handle ToDos in this application using the text that the user is providing"
        }
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
