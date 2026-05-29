"use client"

import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

import { HyraticDashboardSidebar } from "@/components/hyratic/dashboard/app-sidebar"
import Image from "next/image"
import Hamburger from "hamburger-react"

import { UserAvatarDropdown } from "@/components/user-avatar-dropdown"
import { authClient } from "@/lib/auth-client"

/* =========================
   MOBILE HEADER
========================= */
function MobileHeader() {
  const { toggleSidebar } = useSidebar()
  const { data: session } = authClient.useSession()

  const user = session?.user

  return (
    <div className="md:hidden h-14 flex items-center justify-between px-4 border-b bg-background">

      {/* LOGO */}
      <Image
        src="/hytriicstudio.png"
        alt="Logo"
        width={140}
        height={140}
        className="object-contain"
      />

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-3">

        {/* HAMBURGER */}
        <Hamburger
          size={20}
          color="#FE5B00"
          onToggle={() => toggleSidebar()}
        />

        {/* AVATAR */}
        {session && (
          <UserAvatarDropdown
            name={user?.name}
            image={user?.image}
          />
        )}

      </div>
    </div>
  )
}

/* =========================
   DESKTOP HEADER
========================= */
function DesktopHeader() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <div className="hidden md:flex h-14 items-center justify-between px-6 border-b bg-background">

      {/* SIDEBAR TOGGLE */}
      <SidebarTrigger className="h-8 w-8" />

      {/* USER */}
      {session && (
        <UserAvatarDropdown
          name={user?.name}
          image={user?.image}
        />
      )}

    </div>
  )
}

/* =========================
   MAIN LAYOUT
========================= */
export default function Layout({ children }) {
  return (
    <SidebarProvider>

      {/* SIDEBAR */}
      <HyraticDashboardSidebar />

      {/* MAIN */}
      <main className="flex-1">

        {/* MOBILE HEADER */}
        <MobileHeader />

        {/* DESKTOP HEADER */}
        <DesktopHeader />

        {/* PAGE CONTENT */}
        <div className="p-3 md:p-4">
          {children}
        </div>

      </main>

    </SidebarProvider>
  )
}