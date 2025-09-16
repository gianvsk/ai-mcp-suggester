"use client";

import { createContext, useState, useCallback, useMemo } from "react";
import type { ToDo } from "../schemas/toDo";

export type ListContextType = {
  list: ToDo[] | [];
  selected: ToDo[] | [];
  addElement: (value: ToDo['id']) => void;
  removeElement: (value: ToDo['id']) => void;
  toggleSelection: (value: ToDo['id']) => void;
};

export const ToDoContext = createContext<ListContextType | undefined>(
  undefined
);

export const GeneralContext = ({ children }: { children: React.ReactNode }) => {
  const [list, setList] = useState<ToDo[]>([]);
  const [selected, setSelected] = useState<ToDo[]>([]);

  const addElement = useCallback((value: ToDo['id'])=> {
      const sanitizedValue = String(value).trim();
      setList(prev => {
        const newElement: ToDo = {
          id: prev.length,
          text: sanitizedValue.length > 0 ? String(value) : "No text",
          done: false,
        };
        return [...prev, newElement];
      });
  }, []);

  const removeElement = useCallback((id: ToDo['id']) => {
    setList(prev => prev.filter(el => el.id != id));
  }, []);

  const toggleSelection = useCallback((id: ToDo['id']) => {
    setList(prev =>
      prev.map(el => (id === el.id ? { ...el, done: !el.done } : { ...el }))
    );
  }, []);

  const context = useMemo(
    () => ({
      list,
      selected,
      addElement,
      removeElement,
      toggleSelection,
    }),
    [list, selected, addElement, removeElement, toggleSelection]
  );

  return (
    <ToDoContext.Provider value={context}>{children}</ToDoContext.Provider>
  );
};
