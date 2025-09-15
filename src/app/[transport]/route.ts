import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const handler = createMcpHandler(
  server => {
    server.tool(
      "courseRecommender",
      "Give course recommendation based on user's interests",
      {
        experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
      },
      ({ experienceLevel }) => ({
        content: [
          {
            type: "text",
            text: `I recommend you take the following courses for ${
              experienceLevel === "beginner"
                ? "Professional Javascript"
                : "Professional React and Jext.js"
            } course.`,
          },
        ],
      })
    );
  },
  {
    capabilities: {
      tools: {
        courseRecommender: {
          description: "Give course recommendation based on user's interests",
        },
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

console.log('test')

export { handler as GET, handler as POST, handler as DELETE };
