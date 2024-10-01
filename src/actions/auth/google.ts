"use server"

import { googleOAuthClient } from "@/lib/auth/google-oauth"
import { generateCodeVerifier, generateState } from "arctic"
import { cookies } from "next/headers"

export const getGoogleOauthConsentUrl = async () => {
  try {
    const state = generateState()
    const codeVerifier = generateCodeVerifier()

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

    const authUrl = await googleOAuthClient.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["email", "profile"],
      }
    )
    return { success: true, url: authUrl.toString() }
  } catch (error) {
    return { success: false, error: "Something went wrong" }
  }
}
