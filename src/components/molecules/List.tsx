"use client";

import { SingleElement } from "../atoms/SingleElement";
import { useToDo } from "@/app/hooks/useToDo";

export const List = () => {

  const { list, removeElement, toggleSelection } = useToDo()

  return (
      <ul className="text-white">
        {list.length > 0 &&
          list.map(el => (
            <li key={el.id} className="border-white rounded-xl px-3 py-2 w-max border">
              <SingleElement body={el} onToggle={toggleSelection} onRemove={removeElement} />
            </li>
          ))}
      </ul>
  );
};
