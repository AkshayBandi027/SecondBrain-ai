import Providers from "@/lib/providers"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={cn("flex flex-col min-h-[100dvh]", inter.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
