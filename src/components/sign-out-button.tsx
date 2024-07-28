"use client"
import signOut from "@/actions/sign-out"
import { Button } from "./ui/button"

export default function SignOutButton() {
  return (
    <Button variant="ghost" onClick={async () => await signOut()}>
      Sign Out
    </Button>
  )
}
