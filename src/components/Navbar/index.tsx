import Link from "next/link"
import { ThemeSwitcher } from "../theme-toggle-btn"
import { Button } from "../ui/button"
import SignInButton from "../sign-in-button"
import UserButton from "../user-button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { MenuIcon } from "lucide-react"
import { validateRequest } from "@/lib/auth/helpers"

export default async function NavBar() {
  const user = await validateRequest()
  const navLinks = [
    {
      title: "Features",
      href: "#features",
    },
    {
      title: "Changelogs",
      href: "#changelogs",
    },
    {
      title: "Contact",
      href: "#contact",
    },
  ]

  return (
    <header className="container flex items-center justify-between h-[70px] lg:px-6">
      <Link href={"/"} className="font-semibold text-2xl">
        {/* Add the logo */}
        <h1>SecondBrain-ai</h1>
      </Link>
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-2">
          {navLinks.map((nav) => (
            <Link href={nav.href} key={nav.title}>
              <p>{nav.title}</p>
            </Link>
          ))}
        </nav>
        {!user ? <SignInButton /> : <UserButton user={user} />}
        <ThemeSwitcher />
        <Sheet>
          <SheetTrigger asChild className="-order-1">
            <Button
              className="md:hidden mr-3"
              variant="outline"
              size="icon"
              aria-label="Open Menu"
            >
              <MenuIcon className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>SecondBrain</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <Link
                  prefetch={false}
                  href={link.href}
                  className="text-sm font-medium hover:underline underline-offset-4"
                  key={link.href.toLocaleLowerCase()}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
