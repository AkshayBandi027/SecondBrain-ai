"use server"

import { z } from "zod"
import { formSchema } from "@/lib/validators/auth/sign-in"
import { db } from "@/db"
import { Scrypt } from "lucia"
import { lucia } from "@/lib/auth"
import { cookies } from "next/headers"


export default async function signIn(values: z.infer<typeof formSchema>) {
  try {
    const existingUser = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.email, values.email),
    })
    if (!existingUser || !existingUser.hashedPassword) {
      return { formError: "Incorrect Email" }
    }

    const validPassword = await new Scrypt().verify(
      existingUser.hashedPassword,
      values.password
    )
    if (!validPassword) {
      return { formError: "Incorrect password" }
    }

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    return { success: true }
  } catch (error) {
    return { success: false, error: "something went wrong" }
  }
}
