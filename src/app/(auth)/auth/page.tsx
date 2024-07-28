import SignInForm from "@/components/forms/sign-in-form"
import SignUpForm from "@/components/forms/sign-up-form"
import TabSwitcher from "@/components/tab-switcher"
import getUser from "@/lib/auth/helpers"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await getUser()
  console.log(user)
  if (user) redirect("/")
  return (
    <div className="min-h-screen w-full flex relative bg-background">
      <div className="max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <TabSwitcher SignInForm={<SignInForm />} SignUpForm={<SignUpForm />} />
      </div>
    </div>
  )
}
