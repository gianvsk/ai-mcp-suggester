"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { ToDo } from "@/lib/schemas/toDo";
import { getAllTodos } from "@/app/actions/todos";
import { v4 as uuid } from "uuid";

export const McpTodoClient = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadTodos = useCallback(async (silent = false) => {
    const executeLoad = async () => {
      try {
        const todosData = await getAllTodos();
        setTodos(prevTodos => {
          if (JSON.stringify(todosData) !== JSON.stringify(prevTodos)) {
            if (!silent) {
              console.log("Todos caricati:", todosData);
            }
            return todosData;
          }
          return prevTodos;
        });
      } catch (error) {
        console.error("Errore nel caricamento todos:", error);
      }
    };

    if (silent) {
      executeLoad();
    } else {
      startTransition(executeLoad);
    }
  }, [startTransition]);

  useEffect(() => {
    const initializeClient = async () => {
      try {
        const transport = new SSEClientTransport(new URL("/sse", window.location.origin));
        const mcpClient = new Client(
          {
            name: "todo-client",
            version: "1.0.0",
          },
          {
            capabilities: { tools: {} },
          }
        );

        await mcpClient.connect(transport);
        setClient(mcpClient);
        setIsConnected(true);
        console.log("Client MCP connesso!");
        await loadTodos();
      } catch (error) {
        console.error("Errore nella connessione MCP:", error);
        setIsConnected(false);
      }
    };

    initializeClient();
  }, [loadTodos]);

  // Auto-refresh per catturare todos creati esternamente
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      if (isConnected && !isPending) {
        loadTodos(true);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh, isConnected, isPending, loadTodos]);

  const createTodo = async () => {
    if (!client) return;
    
    const currentText = newTodoText;
    const optimisticTodo: ToDo = {
      id: uuid(),
      text: currentText.trim() || 'Test ' + Math.floor(Math.random() * 10000),
      done: false
    };
    
    startTransition(async () => {
      try {
        setTodos(prev => [...prev, optimisticTodo]);
        setNewTodoText("");

        const result = await client.callTool({
          name: "toDoGenerator",
          arguments: {
            toDoBody: {
              text: optimisticTodo.text,
              done: false
            }
          }
        });
        
        console.log("Todo creato tramite MCP:", result);
        
        const updatedTodos = await getAllTodos();
        setTodos(updatedTodos);
        
      } catch (error) {
        console.error("Errore nella creazione del todo:", error);
        setTodos(prev => prev.filter(todo => todo.id !== optimisticTodo.id));
        setNewTodoText(currentText);
      }
    });
  };

  const toggleTodoStatus = async (todoId: ToDo["id"]) => {
    if (!client) return;
    
    startTransition(async () => {
      try {
        setTodos(prev => 
          prev.map(todo => 
            todo.id === todoId ? { ...todo, done: !todo.done } : todo
          )
        );

        const updatedTodos = await getAllTodos();
        setTodos(updatedTodos);
        
      } catch (error) {
        console.error("Errore nell'aggiornamento del todo:", error);
        const revertedTodos = await getAllTodos();
        setTodos(revertedTodos);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <h2 className="text-xl font-bold">MCP Todo Client (Auto-Refresh)</h2>
      
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span>{isConnected ? 'Connesso' : 'Disconnesso'}</span>
        {isPending && <span className="text-blue-500">Caricamento...</span>}
        <div className="ml-4 flex items-center gap-2">
          <input 
            type="checkbox" 
            id="autoRefresh" 
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="autoRefresh" className="text-sm">
            Auto-refresh (3s)
          </label>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Inserisci un nuovo todo..."
          className="flex-1 px-3 py-2 border rounded text-black"
          onKeyPress={(e) => e.key === 'Enter' && createTodo()}
          disabled={isPending}
        />
        <button
          onClick={createTodo}
          disabled={!isConnected || isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {isPending ? 'Creando...' : 'Aggiungi Todo'}
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={() => loadTodos()}
          disabled={isPending}
          className="px-3 py-1 text-sm bg-gray-500 text-white rounded disabled:bg-gray-400"
        >
          Ricarica Manuale
        </button>
        <span className="text-sm text-gray-600">
          {todos.length} todo{todos.length !== 1 ? 's' : ''}
        </span>
        {autoRefresh && (
          <span className="text-xs text-green-600">
            🔄 Auto-aggiornamento attivo
          </span>
        )}
      </div>

      {todos.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Todos:</h3>
          <ul className="space-y-1">
            {todos.map((todo) => (
              <li 
                key={todo.id} 
                className="flex items-center gap-3 p-2 bg-gray-100 rounded text-black hover:bg-gray-200 transition-colors"
              >
                <button
                  onClick={() => toggleTodoStatus(todo.id)}
                  disabled={isPending}
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                    todo.done 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-gray-400 hover:border-green-400'
                  } disabled:opacity-50`}
                >
                  {todo.done && '✓'}
                </button>
                <span className={`flex-1 ${todo.done ? 'line-through opacity-60' : ''}`}>
                  {todo.text}
                </span>
                <span className="text-xs text-gray-500">
                  ID: {todo.id}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {todos.length === 0 && !isPending && (
        <div className="text-center py-8 text-gray-500">
          Nessun todo presente. Creane uno nuovo!
        </div>
      )}
    </div>
  );
};