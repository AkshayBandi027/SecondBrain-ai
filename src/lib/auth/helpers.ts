import { cookies } from "next/headers"
import { lucia } from "."
import { db } from "@/db"

export default async function getUser() {
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
      const sessionCookie =  await lucia.createSessionCookie(sessionId)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
  } catch (error) {
    console.log()
  }

  const dbUser = await db.query.users.findFirst({
    where: (table,{eq}) => eq(user?.id,table.id)
  })
  
  return dbUser
}
