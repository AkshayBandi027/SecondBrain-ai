"use server"

import { cookies } from "next/headers"
import { lucia } from "."
import { cache } from "react"

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null

  if (!sessionId) return null

  const { user, session } = await lucia.validateSession(sessionId)

  try {
    if (!session) {
      const blankSessionCookie = lucia.createBlankSessionCookie()
      cookies().set(
        blankSessionCookie.name,
        blankSessionCookie.value,
        blankSessionCookie.attributes
      )
    }

    if (session && session.fresh) {
      const sessionCookie = await lucia.createSessionCookie(sessionId)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
  } catch (error) {
    console.log()
  }

  return user
})
