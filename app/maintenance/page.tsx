"use client"
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Wrench, RefreshCw } from "lucide-react";

export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full border bg-muted/40 p-4">
            <Wrench className="h-7 w-7 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-primary">
          Under Maintenance
        </h1>

        {/* Description */}
        <p className="mt-3 text-sm text-muted-foreground">
          We’re currently improving the system to give you a better experience.
          Please check back soon.
        </p>

        {/* Status Box */}
        <div className="mt-6 rounded-xl border bg-muted/30 p-4 text-sm">
          Estimated downtime: <span className="font-medium">15–30 minutes</span>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button className="w-full" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>

          <Button variant="outline" className="w-full" asChild>
            <a href="mailto:support@hydratic.com">
              Contact Support
            </a>
          </Button>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-xs text-muted-foreground">
          Thank you for your patience 💛
        </p>
      </div>
    </main>
  );
}