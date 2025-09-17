"use client";

import { useState, useEffect } from "react";
import { List } from "../molecules/List";
import { useToDo } from "@/app/hooks/useToDo";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { todoSchema } from "@/lib/schemas/toDo";

export const GeneratorContainer = () => {
  const [text, setText] = useState("");
  const { addElement, fetchToDoList } = useToDo();

  useEffect(() => {
    const fetchData = async () => {
/*       const transport = new SSEClientTransport(new URL(`${origin}/sse`));

      console.log("transport", transport);

      const client = new Client(
        {
          name: "example-client",
          version: "1.0.0",
        },
        {
          capabilities: {
            prompts: {},
            resources: {},
            tools: {},
          },
        }
      );

      await client.connect(transport);

      const result = await client.request("getAllToDos", todoSchema);
      console.log("result", result); */
      await fetchToDoList();
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-3 border rounded-2xl border-white/80 px-3 py-2">
      <List />
      <div>
        <input
          onChange={e => setText(e.target.value)}
          className="text h-4 w-full bg-white text-black py-1 px-3 border border-white"
        />
        <button className="text-white" onClick={() => addElement(text)}>
          Aggiungi
        </button>
      </div>
    </div>
  );
};
