"use client";

import { createContext, useState, useCallback, useMemo } from "react";
import type { ToDo } from "../schemas/toDo";
import { v4 as uuid } from "uuid";
import { addTodo, removeTodo, toggleTodo, getAllTodos } from "@/app/actions/todos";

export type ListContextType = {
  list: ToDo[] | [];
  selected: ToDo[] | [];
  addElement: (value: ToDo["id"]) => void;
  removeElement: (value: ToDo["id"]) => void;
  toggleSelection: (value: ToDo["id"]) => void;
  fetchToDoList: () => unknown;
};

export const ToDoContext = createContext<ListContextType | undefined>(
  undefined
);

export const GeneralContext = ({ children }: { children: React.ReactNode }) => {
  const [list, setList] = useState<ToDo[]>([]);
  const [selected, setSelected] = useState<ToDo[]>([]);

  const addElement = useCallback(async (value: ToDo["id"]) => {
    const sanitizedValue = String(value).trim();
    if (sanitizedValue.length === 0) return;
    const newElement: ToDo = {
      id: uuid(),
      text: sanitizedValue,
      done: false,
    };

    try {
      const addedToDo = await addTodo(newElement);
      setList(prev => [...prev, newElement]);

      if (!addedToDo) {
        setList(prev => prev.filter(el => el.id !== newElement.id));
        throw new Error("Failed to add ToDo");
      }

      const todoList = await getAllTodos();
      console.log("todoList", todoList);
      setList(todoList);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }, []);

  const removeElement = useCallback(async (id: ToDo["id"]) => {
    const selectedItem = list.find(el => el.id === id);
    setList(prev => prev.filter(el => el.id !== id));
    
    try {
      await removeTodo(id)
    } catch (error) {
      console.error('Error removing todo:', error);
      if(!selectedItem) return;
      setList(prev => [...prev, selectedItem]);
    } finally {
      const todosList = await getAllTodos();
      setList(todosList)
    }
  }, [list]);

  const toggleSelection = useCallback(async (id: ToDo["id"]) => {
    setList(prev => prev.map(el => (id === el.id ? { ...el, done: !el.done } : { ...el })));

    try {
      await toggleTodo(id);
    } catch (error) {
      console.error('Error toggling todo:', error);
      setList(prev =>
        prev.map(el => (id === el.id ? { ...el, done: !el.done } : { ...el }))
      );
    }
  }, []);

  const fetchToDoList = useCallback(async () => {
    const fetchedTodos = await getAllTodos();
    console.log("fetchedTodos", fetchedTodos);
    setList(fetchedTodos);
  }, []);

  const context = useMemo(
    () => ({
      list,
      selected,
      addElement,
      removeElement,
      toggleSelection,
      fetchToDoList,
    }),
    [list, selected, addElement, removeElement, toggleSelection, fetchToDoList]
  );

  return (
    <ToDoContext.Provider value={context}>{children}</ToDoContext.Provider>
  );
};
