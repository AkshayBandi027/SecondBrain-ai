import { z } from "zod"

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type formSchemaType = z.infer<typeof formSchema>