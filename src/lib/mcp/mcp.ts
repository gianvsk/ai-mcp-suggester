'use server'

/* import { RedisAdapter } from '@vercel/mcp-adapter/redis'
import { createContext } from '@modelcontextprotocol/sdk/server'
import { todoSchema } from '@/lib/schemas/toDo'

const adapter = new RedisAdapter({
  url: process.env.MCP_REDIS_URL!,
  token: process.env.MCP_REDIS_PASSWORD!,
})

export const todoContext = createContext({
  name: 'todo-list',
  adapter,
  schema: todoSchema.array(),
  initialValue: [],
}) */