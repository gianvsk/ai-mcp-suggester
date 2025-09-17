"use client";

import { useState, useEffect } from "react";
import { List } from "../molecules/List";
import { useToDo } from "@/app/hooks/useToDo";

export const GeneratorContainer = () => {
  const [text, setText] = useState("");
  const { addElement, fetchToDoList } = useToDo();

  useEffect(() => {
    const fetchData = async () => {
      await fetchToDoList();
    };
    fetchData();
  }, []);

  const addToDo = () => {
    if (text.trim().length === 0) return;
    addElement(text);
    setText("");
  }

  return (
    <div className="flex flex-col justify-between gap-3 border rounded-2xl border-white/80 px-3 py-2 flex-1">
      <List />
      <div>
        <input
          onChange={e => setText(e.target.value)}
          className="text h-4 w-full bg-white text-black py-3 px-3 border border-white"
        />
        <button className="text-white mt-4 border border-white rounded-lg px-3 py-2 hover:cursor-pointer" onClick={addToDo}>
          Aggiungi
        </button>
      </div>
    </div>
  );
};
