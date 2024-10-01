import { googleOAuthClient } from "@/lib/auth/google-oauth"
import { lucia } from "@/lib/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { generateId } from "lucia"

// http://localhost:3000/api/auth/google/callback
export async function GET(req: NextRequest, res: Response) {
  const url = req.nextUrl
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")

  if (!code || !state) {
    console.error("no code or state")
    return new Response("Invalid Request", { status: 400 })
  }

  const codeVerifier = cookies().get("codeVerifier")?.value
  const savedState = cookies().get("state")?.value

  if (!codeVerifier || !savedState) {
    console.error("no code verifier or state")
    return new Response("Invalid Request", { status: 400 })
  }

  if (state !== savedState) {
    console.error("state mismatch")
    return new Response("Invalid Request", { status: 400 })
  }

  const { accessToken } = await googleOAuthClient.validateAuthorizationCode(
    code,
    codeVerifier
  )
  const googleResponse = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const googleData = (await googleResponse.json()) as {
    id: string
    email: string
    name: string
    picture: string
  }

  let userId: string = ""

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, googleData.email),
  })

  if (!existingUser) {
    const id = generateId(12)
    await db.insert(users).values({
      id,
      name: googleData.name,
      email: googleData.email,
    })
    userId = id
  } else {
    userId = existingUser.id
  }

  const session = await lucia.createSession(userId, {})
  const sessionCookie = await lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect("/dashboard")
}
