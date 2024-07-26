import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecondBrain-ai",
  description: "", // add meaningful description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("flex flex-col min-h-[100dvh]",inter.className)}>
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        
        >
        {children}
        </ThemeProvider>
     </body>
    </html>
  );
}
