"use client"

import { authClient } from "@/lib/auth-client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserAvatarDropdown({ user }) {
  const initials =
    (user?.name && user.name.slice(0, 2).toUpperCase()) || "U"

  const handleLogout = async () => {
    await authClient.signOut()
    window.location.href = "/"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8 border-2 border-primary">
            <AvatarImage
              src={user?.image || ""}
              alt={user?.name || "User"}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-44">
        <div className="px-2 py-1 text-xs text-muted-foreground">
          Signed in as
          <p className="font-medium text-foreground truncate">
            {user?.name || "User"}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <a href="/profile">Profile</a>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <a href="/settings">Settings</a>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <a href="/billing">Billing</a>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-500 cursor-pointer"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}