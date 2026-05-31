"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function FCard() {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">

      {/* Image / Cover */}
      <div className="relative">
        <div className="absolute inset-0 z-10 bg-black/30" />
        <img
          src="https://avatar.vercel.sh/freelancer"
          alt="Freelancer cover"
          className="relative z-0 aspect-video w-full object-cover grayscale dark:brightness-50"
        />

        {/* Top Badge */}
        <div className="absolute top-3 right-3 z-20">
          <Badge variant="secondary">Top Rated</Badge>
        </div>

        {/* Avatar overlay */}
        <div className="absolute -bottom-6 left-4 z-20">
          <Avatar className="h-14 w-14 border">
            <AvatarImage src="https://avatar.vercel.sh/user" />
            <AvatarFallback>FN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardHeader className="pt-8">
        <CardTitle className="flex items-center gap-2">
          John Doe
        </CardTitle>

        <CardDescription>
          Full Stack Developer • React, Next.js, Node.js
        </CardDescription>

        <CardAction>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">Node.js</Badge>
            <Badge variant="secondary">UI/UX</Badge>
          </div>
        </CardAction>
      </CardHeader>

      <CardFooter className="flex flex-col gap-3">
        
        {/* Stats */}
        <div className="flex w-full justify-between text-sm">
          <span>⭐ 4.9 (120 reviews)</span>
          <span>⏱ Replies in 1h</span>
        </div>

        {/* Price */}
        <div className="w-full text-sm">
          Starting from <span className="font-medium">$20/hr</span>
        </div>

        {/* CTA */}
        <div className="flex w-full gap-2">
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
          <Button className="w-full">
            Hire Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}


export default FCard