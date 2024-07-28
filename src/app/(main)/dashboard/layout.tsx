import SideBar from "@/components/Dashboard/side-nav"
import type { ReactNode } from "react"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full p-4 bg-background">
      <div className="flex ">
        <SideBar />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
