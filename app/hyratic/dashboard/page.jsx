"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Library,
  Flame,
  HomeAddAngle,
  Folder,
} from "@solar-icons/react"

import { authClient } from "@/lib/auth-client"

import  PerformaceChart from "@/components/PerformanceChart.tsx"
import Fcard from "@/components/Fcard"

/* ---------------- OVERVIEW (BUTTON CARDS) ---------------- */
function Overview() {
  const actions = [
    {
      title: "Upload Skills",
      description: "Build your freelancer profile",
      href: "/hyratic/dashboard/skills",
      icon: HomeAddAngle,
    },
    {
      title: "Find Work",
      description: "Browse freelance opportunities",
      href: "/hyratic/jobs",
      icon: Flame,
    },
    {
      title: "My Projects",
      description: "Track active & completed work",
      href: "/hyratic/dashboard/projects",
      icon: Library,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((item) => {
        const Icon = item.icon

        return (
          <Link key={item.title} href={item.href}>
            <Card className="cursor-pointer rounded-xl hover:shadow-md hover:-translate-y-1 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-muted">
                    <Icon size={34} color="#FE5B00" />
                  </div>

                  <div>
                    <CardTitle className="text-base">
                      {item.title}
                    </CardTitle>

                    <CardDescription className="text-xs">
                      {item.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

/* ---------------- PERFORMANCE TAB (was Analytics) ---------------- */
function Performance() {
  return (
       <div className="w-2xl h-[100px]">
        <PerformaceChart />
       </div>
  )
}

/* ---------------- ACTIVITY TAB (was Insights) ---------------- */
function Activity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>
          Recent actions and project updates
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground">
          Activity logs coming soon 🚀
        </p>
      </CardContent>
    </Card>
  )
}

/* ---------------- TABS ---------------- */
function TabsLine() {
  return (
    <Tabs defaultValue="overview" className="w-full">

      <TabsList className="grid grid-cols-3 w-full max-w-md">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

      <div className="mt-4 space-y-4">
        <TabsContent value="overview">
          <Overview />
        </TabsContent>

        <TabsContent value="performance">
          <Performance />
        </TabsContent>

        <TabsContent value="activity">
          <Activity />
        </TabsContent>
      </div>

    </Tabs>
  )
}


function ExploreOtherFreelancers() {
  return (
    <div>
      <Fcard />
    </div>
  )
}

/* ---------------- PAGE ---------------- */
export default function Page() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const res = await authClient.getSession()
      setSession(res)
    }

    getUser()
  }, [])

  return (
    <div className="p-4 space-y-4">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold font-heading">
          <span className="text-primary ">Hello,</span>{" "}
          {session?.user?.name || "Ali bhai"}!
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your freelancing work, projects & earnings in one place.
        </p>
      </div>


      <div>
        <h1 className="text-2xl font-heading">Explore Others</h1>
        
      </div>

      <TabsLine />
    </div>
  )
}
