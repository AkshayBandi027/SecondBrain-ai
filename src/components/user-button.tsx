import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { CircleUserRound } from "lucide-react"
import SignOutButton from "./sign-out-button"
import { User } from "@/db/schema"

interface UserButtonProps extends IntrinsicAttributes {
   user: User
}

export default function UserButton({ user }: UserButtonProps) {
  console.log(user.name)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <CircleUserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="text-center">
          <p className="font-semibold text-base">
            {user.name} <br /> <span className="font-normal opacity-80">{user.email}</span>
          </p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
