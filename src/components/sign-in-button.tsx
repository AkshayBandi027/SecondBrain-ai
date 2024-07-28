"use client"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function SignInButton() {
  const router = useRouter()
  return <Button onClick={() => router.push("/auth")}>Sign In</Button>
}
