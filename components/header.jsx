"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { SignupForm } from "./signup-form";
import { LoginForm } from "./login-form";
import { Spinner } from "@/components/ui/spinner";

import { authClient } from "@/lib/auth-client";

/* ---------- UI Components ---------- */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ---------- Reusable Auth Dialog ---------- */
function AuthDialog({ trigger, title, children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-4">{children}</div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Avatar Dropdown ---------- */
function AvatarDropdown({ name, image }) {
  const initials = name ? name.slice(0, 2).toUpperCase() : "U";

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="size-8 border-primary border-2 border-solid">
            <AvatarImage src={image || ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
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
  );
}

/* ---------- Header ---------- */
export function Header() {
  const scrolled = useScroll(10);
  const { data: session } = authClient.useSession();

  const [loginLoading] = useState(false);
  const [signupLoading] = useState(false);

  const user = session?.user;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-[#F6F6F6]",
        {
          "border-border backdrop-blur-sm supports-backdrop-filter:bg-background/50":
            scrolled,
        }
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">

        {/* LEFT */}
        <div className="flex items-center gap-5">
          <a
            href="/"
            className="rounded-lg px-3 py-2.5 hover:bg-muted dark:hover:bg-muted/50"
          >
            <Logo className="h-4" />
          </a>

          <DesktopNav />
        </div>

        {/* RIGHT */}
        <div className="hidden items-center gap-2 md:flex">

          {/* IF LOGGED IN */}
          {session ? (
            <AvatarDropdown
              name={user?.name}
              image={user?.image}
            />
          ) : (
            <>
              {/* LOGIN */}
              <AuthDialog
                title={<Logo />}
                trigger={
                  <Button variant="outline" disabled={loginLoading}>
                    {loginLoading ? (
                      <span className="flex items-center gap-2">
                        <Spinner /> Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                }
              >
                <LoginForm className="mt-4" />
              </AuthDialog>

              {/* SIGNUP */}
              <AuthDialog
                title={<Logo />}
                trigger={
                  <Button disabled={signupLoading}>
                    {signupLoading ? (
                      <span className="flex items-center gap-2">
                        <Spinner /> Loading...
                      </span>
                    ) : (
                      "Get Started"
                    )}
                  </Button>
                }
              >
                <SignupForm />
              </AuthDialog>
            </>
          )}
        </div>

        {/* MOBILE */}
        <MobileNav />
      </nav>
    </header>
  );
}