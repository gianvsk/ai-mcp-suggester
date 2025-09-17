"use server";
import { z } from "zod";

import { ToDo, todoSchema } from "@/lib/schemas/toDo";
import redis from "@/lib/plugin/redis-client";

export const addTodo = async (value: ToDo) => {
  const id = Date.now().toString();
  await redis.set(`todo:${id}`, JSON.stringify({ ...value }));
  return { value };
};

export const removeTodo = async (id: ToDo["id"]) => {
  await redis.del(`todo:${id}`);
};

export const getAllTodos = async () => {
  await redis.keys("todo:*");
  const keys = await redis.keys("todo:*");
  const todos = await Promise.all(
    keys.map(async key => {
     try {
      const todoString = await redis.get<ToDo>(key);

      if (!todoString) return null;

      const parseResult = todoSchema.safeParse(todoString);
      return parseResult.success ? parseResult.data : null;
    } catch (error) {
      console.error('Error getting todo:', error);
      return null;
    }
  }).filter(Boolean)
  );
  return todos;
};
