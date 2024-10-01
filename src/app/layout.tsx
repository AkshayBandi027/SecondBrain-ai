import Providers from "@/lib/providers"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SecondBrain-ai",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("flex flex-col min-h-[100dvh]")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
