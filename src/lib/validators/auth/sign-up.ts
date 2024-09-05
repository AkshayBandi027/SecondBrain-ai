import { z } from "zod"

export const formSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password doesn't match",
  })

export type formSchemaType = z.infer<typeof formSchema>
