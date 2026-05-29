"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="mb-8 flex justify-center">
              <Logo />
            </div>

            <h1 className="text-4xl font-bold text-primary">
              Application Error
            </h1>

            <p className="mt-3 text-muted-foreground">
              The application encountered a critical error.
            </p>

            <Button
              className="mt-6 w-full"
              onClick={() => reset()}
            >
              Reload Application
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}