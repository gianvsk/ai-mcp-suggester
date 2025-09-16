"use client";

import type { ToDo } from "@/lib/schemas/toDo";
import { memo } from "react";

export const SingleElement = memo(function SingleElement({
  body,
  onToggle,
  onRemove,
}: {
  body: ToDo;
  onToggle: (value: ToDo['id']) => void;
  onRemove: (value: ToDo['id']) => void;
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
