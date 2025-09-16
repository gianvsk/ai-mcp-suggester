"use client";

import { createContext, useState, useCallback, useMemo } from "react";

export type ListContextType = {
  list: ToDo[] | [];
  selected: ToDo[] | [];
  addElement: (value: string) => void;
  removeElement: (value: number) => void;
  toggleSelection: (value: number) => void;
};

export type ToDo = {
  id: number;
  text: string;
  done: boolean;
};

export const ToDoContext = createContext<ListContextType | undefined>(
  undefined
);

export const GeneralContext = ({ children }: { children: React.ReactNode }) => {
  const [list, setList] = useState<ToDo[]>([]);
  const [selected, setSelected] = useState<ToDo[]>([]);

  const addElement = useCallback((value: string) => {
    if (value.trim().length > 0)
      setList(prev => {
        const newElement: ToDo = {
          id: prev.length,
          text: value && value.trim().length > 0 ? value : "No text",
          done: false,
        };
        return [...prev, newElement];
      });
  }, []);

  const removeElement = useCallback((id: number) => {
    setList(prev => prev.filter(el => el.id !== id));
  }, []);

  const toggleSelection = useCallback((id: number) => {
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
