import { GeneratorContainer } from "@/components/organisms/GeneratorContainer";
import { McpTodoClient } from "@/components/McpTodoClient";
import { GeneralContext } from "@/lib/context/toDoContext";

export default function Home() {

  return (
    <GeneralContext>
      <div className="flex flex-col gap-6">
        <h1>This is a To Do Generator with MCP</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Vecchio Sistema (Context)</h2>
            <GeneratorContainer />
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Nuovo Sistema (MCP Client)</h2>
            <McpTodoClient />
          </div>
        </div>
      </div>
    </GeneralContext>
  );
}
