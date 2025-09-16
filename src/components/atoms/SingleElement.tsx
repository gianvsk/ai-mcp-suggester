"use client";

import { ToDo } from "@/lib/context/toDoContext";
import { memo } from "react";

export const SingleElement = memo(function SingleElement({
  body,
  onToggle,
  onRemove,
}: {
  body: ToDo;
  onToggle: (value: number) => void;
  onRemove: (value: number) => void;
}) {

  const isDone = !!body.done;

  return (
    <div className="flex gap-2 text-white">
      <button
        onClick={() => onToggle(body.id)}
        className="w-4 h-4 rounded-xl flex justify-center items-center"
      >
        <span className="text-white">{ isDone ? "V" : ""}</span>
      </button>
      <>
      <p>{body.text}</p>
      <p>{body.done.toString()}</p>
      </>
      <button onClick={() => onRemove(body.id)} className="w-4 h-4 text-white">X</button>
    </div>
  );
});
