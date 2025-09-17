"use server";

import { ToDo } from "@/lib/schemas/toDo";
import redis from "@/lib/plugin/client";

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
      const todoString: string | null = await redis.get(key);

      if (!todoString) return null;
      return JSON.parse(todoString);
    })
  );
  return todos;
};
