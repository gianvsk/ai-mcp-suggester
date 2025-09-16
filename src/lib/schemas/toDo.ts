import { z } from "zod"

export const todoSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  done: z.boolean(),
})

export type Todo = z.infer<typeof todoSchema>