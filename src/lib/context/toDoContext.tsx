"use client";

import { createContext, useState, useCallback, useMemo } from "react";
import type { ToDo } from "../schemas/toDo";
import { v4 as uuidv4 } from "uuid";
import { addTodo, getAllTodos } from "@/app/actions/todos";

export type ListContextType = {
  list: ToDo[] | [];
  selected: ToDo[] | [];
  addElement: (value: ToDo['id']) => void;
  removeElement: (value: ToDo['id']) => void;
  toggleSelection: (value: ToDo['id']) => void;
  fetchToDoList: () => unknown;
};

export const ToDoContext = createContext<ListContextType | undefined>(
  undefined
);

export const GeneralContext = ({ children }: { children: React.ReactNode }) => {
  const [list, setList] = useState<ToDo[]>([]);
  const [selected, setSelected] = useState<ToDo[]>([]);

  const addElement = useCallback(async (value: ToDo['id']) => {
    const sanitizedValue = String(value).trim();
    if (sanitizedValue.length === 0) return;
      const newElement: ToDo = {
        id: uuidv4(),
        text: sanitizedValue,
        done: false,
      };
      setList(prev => [...prev, newElement]);
      const addedToDo = await addTodo(newElement);
      console.log('addedToDo', addedToDo);
  }, []);

  const removeElement = useCallback(async (id: ToDo['id']) => {
/*     try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error('Failed to remove todo');
      }

      const data = await response.json();
      setList(data.todos);
    } catch (error) {
      console.error('Error removing todo:', error);
      // Fallback alla logica locale
      setList(prev => prev.filter(el => el.id !== id));
    } */
  }, []);

  const toggleSelection = useCallback(async (id: ToDo['id']) => {
/*     try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, action: 'toggle' })
      });

      if (!response.ok) {
        throw new Error('Failed to toggle todo');
      }

      const data = await response.json();
      setList(data.todos);
    } catch (error) {
      console.error('Error toggling todo:', error);
      // Fallback alla logica locale
      setList(prev =>
        prev.map(el => (id === el.id ? { ...el, done: !el.done } : { ...el }))
      );
    } */
  }, []);

  const fetchToDoList = useCallback(async() => {
    const fetchedTodos = await getAllTodos();
    console.log('fetchedTodos', fetchedTodos);
    setList(fetchedTodos || []);
  }, []);

  const context = useMemo(
    () => ({
      list,
      selected,
      addElement,
      removeElement,
      toggleSelection,
      fetchToDoList
    }),
    [list, selected, addElement, removeElement, toggleSelection, fetchToDoList]
  );

  return (
    <ToDoContext.Provider value={context}>{children}</ToDoContext.Provider>
  );
};
