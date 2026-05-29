"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <h1 className="text-4xl font-bold text-primary">
          Something Went Wrong
        </h1>

        <p className="mt-3 text-muted-foreground">
          An unexpected error occurred while loading this page.
        </p>

        <Button
          className="mt-6 w-full"
          onClick={() => reset()}
        >
          Try Again
        </Button>
      </div>
    </main>
  );
}