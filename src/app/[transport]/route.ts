import { createMcpHandler } from "mcp-handler";
import {
  addTodo,
  getAllTodos,
  removeTodo,
  toggleTodo,
} from "@/app/actions/todos";
import { todoSchema } from "@/lib/schemas/toDo";

const handler = createMcpHandler(
  server => {
    server.tool(
      "toDoGenerator",
      "Handle ToDos in this application using the text that the user is providing",
      {
        toDoBody: todoSchema,
      },
      async ({ toDoBody }) => {
        const { id, text } = toDoBody;

        try {
          const addedToDo = await addTodo(toDoBody);
          if (!addedToDo) {
            throw new Error("Failed to add ToDo");
          }

          return {
            content: [
              {
                type: "text",
                text: `Created new ToDo: "${text}" (ID: ${id}).`,
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
      "removeToDo",
      "Remove a todo from the database",
      {
        toDoBody: todoSchema,
      },
      async ({ toDoBody }) => {
        const { text, id, done } = toDoBody;

        try {
          await removeTodo(id);

          return {
            content: [
              {
                type: "text",
                text: `Removed a single or multiple ToDo by text, id, or done: "${text}" (ID: ${id}, Done: ${done}).`,
              },
            ],
          };
        } catch (error) {
          console.error("Error in removeToDo:", error);
          return {
            content: [
              {
                type: "text",
                text: `Error removing ToDo with ID: ${id}, Text: ${text}, Done: ${done}: ${error}`,
              },
            ],
          };
        }
      }
    );

    server.tool(
      "toggleToDo",
      "Toggle a todo's completion status",
      {
        toDoBody: todoSchema,
      },
      async ({ toDoBody }) => {
        const { text, id, done } = toDoBody;

        try {
          await toggleTodo(id);

          return {
            content: [
              {
                type: "text",
                text: `Toggled ToDo: "${text}" (ID: ${id}, Done: ${done}).`,
              },
            ],
          };
        } catch (error) {
          console.error("Error in toggleToDo:", error);
          return {
            content: [
              {
                type: "text",
                text: `Error toggling ToDo with ID: ${id}, Text: ${text}, Done: ${done}: ${error}`,
              },
            ],
          };
        }
      }
    );

    server.tool(
      "getAllToDos",
      "Get all the todos stored in the database",
      {},
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
          description: "Get all the todos stored in the database",
        },
        removeToDo: {
          description: "Remove a todo from the database",
        },
        toggleToDo: {
          description: "Toggle a todo's completion status",
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
