import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="mb-8">
          <h1 className="text-7xl font-bold text-primary">
            404
          </h1>

          <h2 className="mt-4 text-2xl font-semibold">
            Page Not Found
          </h2>

          <p className="mt-2 text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Button asChild className="w-full">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </div>
    </main>
  );
}