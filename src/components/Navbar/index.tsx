import Link from "next/link"
import { ThemeSwitcher } from "../theme-toggle-btn"

export default function NavBar() {
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
        <ThemeSwitcher />
      </div>
    </header>
  )
}
