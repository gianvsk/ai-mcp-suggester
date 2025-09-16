import { z } from "zod"

export const todoSchema = z.object({
  id: z.union([z.string(), z.number()]),
  text: z.string().min(1),
  done: z.boolean(),
})

export type ToDo = z.infer<typeof todoSchema>