import { Sidebar } from "@/components/sidebar"

export default  function MainLayout ({ children }: { children: React.ReactNode })  {
  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen bg-slate-100  text-black rounded-lg p-4 mt-4">
       {children}
      </main>
    </div>
  )
}
