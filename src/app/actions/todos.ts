"use server";

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
    try {
  await redis.keys("todo:*");
  const keys = await redis.keys("todo:*");

  if (keys.length === 0) return [];

  const todos = await Promise.all(
    keys.map(async key => {
     try {
      const todoString = await redis.get<ToDo>(key);

      if (!todoString) return false;

      const parseResult = todoSchema.safeParse(todoString);
      return parseResult.success ? parseResult.data : false;
    } catch (error) {
      console.error('Error getting single todo:', error);
      return false
    }
  })
  );
  return todos.filter(el => !!el) || [];
  } catch (error) {
    console.error('Error fetching the list of todos:', error);
    return [];
  }
};
