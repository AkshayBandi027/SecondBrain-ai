"use server"

import { z } from "zod"
import type { formSchema } from "@/components/forms/sign-up-form"
import { db } from "@/db"
import { generateId, Scrypt } from "lucia"
import { users } from "@/db/schema"
import { lucia } from "@/lib/auth"
import { cookies } from "next/headers"


export default async function signUp(values: z.infer<typeof formSchema>) {
  try {
    const existingUser = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.email, values.email),
    })
    if (existingUser) {
      return {
        formError: "Cannot create a account with email",
      }
    }

    const userId = generateId(21)
    const hashedPassword = await new Scrypt().hash(values.password)
    await db.insert(users).values({
      id: userId,
      name: values.name,
      email: values.email,
      hashedPassword,
    })

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    return { success: true }
    //redirect("") to verification of email with verfication code .
  } catch (error) {
    return { error: "Something went wrong", success: false }
  }
}
