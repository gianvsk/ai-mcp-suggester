"use client";

import { GeneratorContainer } from "@/components/organisms/GeneratorContainer";
import { GeneralContext } from "@/lib/context/toDoContext";

export default function Home() {
  return (
    <GeneralContext>
      <div className="flex flex-col gap-3">
        <h1>This is a To Do Generator with MCP</h1>
        <GeneratorContainer />
      </div>
    </GeneralContext>
  );
}
