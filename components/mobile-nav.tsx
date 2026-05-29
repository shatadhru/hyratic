"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/portal";
import {
  companyLinks,
  companyLinks2,
  productLinks,
} from "@/components/nav-links";
import { LinkItem } from "@/components/sheard";
import { XIcon, MenuIcon, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ---------- Avatar Dropdown (SELF-CONTAINED) ---------- */
function AvatarDropdown({ user }) {
  const initials = user?.name?.slice(0, 2).toUpperCase() || "U";

  const logout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="size-8 border border-primary">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => (window.location.href = "/hyratic/dashboard")}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="text-red-500 cursor-pointer"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ---------- MOBILE NAV ---------- */
export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const { data: session } = authClient.useSession();

  const user = session?.user;

  return (
    <div className="md:hidden flex items-center gap-2">

      {/* ---------- OUTSIDE HEADER AUTH ---------- */}
      {session ? (
        <AvatarDropdown user={user} />
      ) : (
        <>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/auth/login")}
          >
            Sign In
          </Button>

          <Button
            onClick={() => (window.location.href = "/auth/signup")}
          >
            Get Started
          </Button>
        </>
      )}

      {/* ---------- MENU BUTTON ---------- */}
      <Button
        aria-label="Toggle menu"
        size="icon"
        variant="outline"
        onClick={() => setOpen(!open)}
      >
        <div
          className={cn(
            "transition-all",
            open ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        >
          <XIcon />
        </div>

        <div
          className={cn(
            "absolute transition-all",
            open ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        >
          <MenuIcon />
        </div>
      </Button>

      {/* ---------- MENU ---------- */}
      {open && (
        <Portal className="top-14">
          <PortalBackdrop />

          <div
            className={cn(
              "size-full overflow-y-auto p-4",
              "data-[slot=open]:animate-in data-[slot=open]:zoom-in-95"
            )}
            data-slot={open ? "open" : "closed"}
          >

            {/* ---------- AUTH SECTION INSIDE MENU ---------- */}
            <div className="mb-4 flex flex-col gap-2">
              {session ? (
                <Button
                  className="w-full flex items-center gap-2"
                  onClick={() =>
                    (window.location.href = "/hyratic/dashboard")
                  }
                >
                  <User className="size-4" />
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() =>
                      (window.location.href = "/auth/login")
                    }
                  >
                    Sign In
                  </Button>

                  <Button
                    className="w-full"
                    onClick={() =>
                      (window.location.href = "/auth/signup")
                    }
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* ---------- LINKS ---------- */}
            <div className="flex flex-col gap-y-2">
              <span className="text-sm">Product</span>
              {productLinks.map((link) => (
                <LinkItem
                  key={`product-${link.label}`}
                  className="rounded-lg p-2 active:bg-muted"
                  {...link}
                />
              ))}

              <span className="text-sm">Company</span>
              {companyLinks.map((link) => (
                <LinkItem
                  key={`company-${link.label}`}
                  className="rounded-lg p-2 active:bg-muted"
                  {...link}
                />
              ))}

              {companyLinks2.map((link) => (
                <LinkItem
                  key={`company2-${link.label}`}
                  className="rounded-lg p-2 active:bg-muted"
                  {...link}
                />
              ))}
            </div>

          </div>
        </Portal>
      )}
    </div>
  );
}