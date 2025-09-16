import { useContext } from "react";
import { ToDoContext, ListContextType } from "@/lib/context/toDoContext";

export const useToDo = (): ListContextType => {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error("useToDo deve essere usato dentro un GeneralContext provider");
  }
  return context;
};