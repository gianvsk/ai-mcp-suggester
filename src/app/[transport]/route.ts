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
          done: z.boolean(),
        }),
      },
      async ({ toDoBody }) => {
        try {
          const todo = {
            id: Date.now().toString(),
            text: toDoBody.text,
            done: toDoBody.done,
          };

          const addedToDo = await addTodo(todo);
          if (!addedToDo) {
            throw new Error("Failed to add ToDo");
          }

          const todoList = await getAllTodos();

          return {
            content: [
              {
                type: "text",
                text: `Created new ToDo: "${todo.text}" (ID: ${todo.id}) and fetch all ToDos after a ToDo is added. Fetched ToDos will be: ${todoList}.`,
              },
            ],
          };
        } catch (error) {
          console.error("Error in toDoGenerator:", error);
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
    );
    
    server.tool(
      "getAllToDos",
      "Get all the todos stored in the database",
      {
      },
      async () => {
        try {
          const todoList = await getAllTodos();

          return {
            content: [
              {
                type: "text",
                text: `Fetch all the ToDos from database. The list of todos will be: ${todoList}.`,
              },
            ],
          };
        } catch (error) {
          console.error("Error in getAllToDos:", error);
          return {
            content: [
              {
                type: "text",
                text: `Error fetching ToDos: ${error}`,
              },
            ],
          };
        }
      }
    );
  },
  {
    capabilities: {
      tools: {
        toDoGenerator: {
          description:
            "Handle ToDos in this application using the text that the user is providing",
        },
        getAllToDos: {
          description:
            "Get all the todos stored in the database",
        },
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
