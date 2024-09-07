import type { ReactNode } from "react"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <div className="min-h-screen w-full p-4 bg-white">{children}</div>
}

export default DashboardLayout
