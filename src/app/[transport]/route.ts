import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { addTodo, getAllTodos } from "@/app/actions/todos";

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
      async ({ toDoBody }) => {
        try {
          const todo = {
            id: Date.now().toString(),
            text: toDoBody.text,
            done: toDoBody.done
          };
          
          const isElementAdded = await addTodo(todo);
          if (!isElementAdded) {
            throw new Error('Failed to add ToDo');
          }
          const allTodos = await getAllTodos();
          if (!allTodos) {
            throw new Error('Failed to fetch all ToDos');
          }
          return {
            content: [
              {
                type: "text",
                text: `Created new ToDo: "${todo.text}" (ID: ${todo.id}). Total todos: ${allTodos.length}`,
              },
            ],
          };
        } catch (error) {
          console.error('Error in toDoGenerator:', error);
          return {
            content: [
              {
                type: "text",
                text: `Error creating ToDo: ${error}`,
              },
            ],
          };
        }
      }
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
    basePath: "/",
    verboseLogs: true,
    maxDuration: 300, 
  }
);

export { handler as GET, handler as POST, handler as DELETE };
