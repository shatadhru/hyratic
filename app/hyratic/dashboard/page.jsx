"use client"

import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* ---------------- OVERVIEW ---------------- */
function Overview() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          This is the overview section of the dashboard.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>
          Here you can find a summary of your dashboard's key metrics and recent activity.
        </p>
      </CardContent>
    </Card>
  )
}

/* ---------------- ANALYTICS ---------------- */
function Analytics() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Performance and insights data.</CardDescription>
      </CardHeader>

      <CardContent>
        <p>Analytics charts will go here.</p>
      </CardContent>
    </Card>
  )
}

/* ---------------- REPORTS ---------------- */
function Reports() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        <CardDescription>Generated reports and exports.</CardDescription>
      </CardHeader>

      <CardContent>
        <p>Reports section content.</p>
      </CardContent>
    </Card>
  )
}

/* ---------------- TABS ---------------- */
function TabsLine() {
  return (
    <Tabs defaultValue="overview" className="w-full">

      {/* NAVIGATION */}
      <TabsList className="grid grid-cols-3 w-full max-w-md">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>

      {/* CONTENT */}
      <div className="mt-4">
        <TabsContent value="overview">
          <Overview />
        </TabsContent>

        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>

        <TabsContent value="reports">
          <Reports />
        </TabsContent>
      </div>

    </Tabs>
  )
}

/* ---------------- PAGE ---------------- */
export default function Page() {
  return (
    <div className="p-4">
      <TabsLine />
    </div>
  )
}