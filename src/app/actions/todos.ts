"use server";

import { ToDo, todoSchema } from "@/lib/schemas/toDo";
import redis from "@/lib/plugin/redis-client";
import { revalidatePath } from "next/cache";

export const addTodo = async (value: ToDo) => {
  const { id } = value;
  const addedElement = await redis.set(`todo:${id}`, JSON.stringify({ ...value, id }));
    
  if(!addedElement) return false
  
  const { success } = todoSchema.safeParse(value);
  if (!success) revalidatePath("/");
  return success;
};

export const removeTodo = async (id: ToDo["id"]) => {
  try {
    const response = await redis.del(`todo:${id}`);
    return response;
  } catch (error) {
    console.error("Error removing todo:", error);
    return false;
  }
};

export const toggleTodo = async (id: ToDo["id"]) => {
  try {
    const fetchedToDo = await redis.get<ToDo>(`todo:${id}`);
    
    if (!fetchedToDo) throw new Error("ToDo not found");

    const updatedTodo = { ...fetchedToDo, done: !fetchedToDo.done };
    await redis.set(`todo:${id}`, JSON.stringify(updatedTodo));
    return updatedTodo;
  } catch (error) {
    console.error("Error toggling todo:", error);
    throw error;
  }
};

export const getAllTodos = async () => {
  try {
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
          console.error("Error getting single todo:", error);
          return false;
        }
      })
    );
    return todos.filter(el => !!el) || []
  } catch (error) {
    console.error("Error fetching the list of todos:", error);
    return [];
  }
};
