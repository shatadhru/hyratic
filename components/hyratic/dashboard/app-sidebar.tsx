"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Solar Icons
import {
  HomeSmile,
  Folder,
  Ufo,
  WalletMoney,
  ChatLine,
  UserId,
  Bell,
  SettingsMinimalistic,
  DollarMinimalistic,
  GalleryFavourite,
  Power,
} from "@solar-icons/react"

const mainNav = [
  { title: "Dashboard", icon: HomeSmile, href: "dashboard" },
  { title: "Orders", icon: Folder, href: "orders" },
  { title: "SkillHubs", icon: Ufo, href: "skillhubs" },
  { title: "Earnings", icon: WalletMoney, href: "earnings" },
]

const secondaryNav = [
  { title: "Inbox", icon: ChatLine, href: "inbox" },
  { title: "Media", icon: GalleryFavourite, href: "media" },
  { title: "Review", icon: DollarMinimalistic, href: "review" },
]

const systemNav = [
  { title: "Profile", icon: UserId, href: "profile" },
  { title: "Notifications", icon: Bell, href: "notifications" },
  { title: "Settings", icon: SettingsMinimalistic, href: "settings" },
]

export function HyraticDashboardSidebar() {
  const pathname = usePathname()
  const base = "/hyratic"
  const { state } = useSidebar()

  const isCollapsed = state === "collapsed"

  const isActive = (href: string) =>
    pathname === `${base}/${href}`

  // 🔥 slightly bigger but clean
  const iconClass = "h-5! w-5! text-[#FE5B00]"

  const renderItem = (item: any) => (
    <SidebarMenuItem key={item.title}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarMenuButton
            asChild
            isActive={isActive(item.href)}
          >
            <Link href={`${base}/${item.href}`}>
              <item.icon
                weight="BoldDuotone"
                size={55}
                className={iconClass}
              />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </TooltipTrigger>

        <TooltipContent side="right">
          {item.title}
        </TooltipContent>
      </Tooltip>
    </SidebarMenuItem>
  )

  return (
    <Sidebar collapsible="icon">

      {/* HEADER */}
      <SidebarHeader className="p-5 flex justify-center">

        {isCollapsed ? (
         <div className=" w-6 h-6 -m-2">
             <Image
            src="/logo2.png"
            alt="Rail Logo"
            width={55}
            height={55}
            className="object-contain"
          />
         </div>
        ) : (
          <Image
            src="/hytriicstudio.png"
            alt="Full Logo"
            width={160}
            height={160}
            className="object-contain"
          />
        )}

      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>

        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map(renderItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map(renderItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNav.map(renderItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>

            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton asChild>
                  <Link href="/logout" className="text-red-500">
                    <Power className="h-7 w-7 text-[#FE5B00]" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>

              <TooltipContent side="right">
                Logout
              </TooltipContent>
            </Tooltip>

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}