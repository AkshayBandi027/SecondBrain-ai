import { BarChart2, HelpCircle, Home, Settings, Users, Bot, User } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ScrollArea } from "./ui/scroll-area"


export const Sidebar = () => {
  return (
    <div
      className="h-full w-[20%] flex-shrink-0">

      <div className="flex flex-col h-full">
        <ScrollArea className="flex-grow">
          <nav className="space-y-2 p-4 sticky top-0">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BarChart2 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Team
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
          </nav>

        </ScrollArea>
        
        <div className="p-4 sticky bottom-0 border-t-2 border-gray-200">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src="/placeholder.svg?height=36&width=36"
                alt="User"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
