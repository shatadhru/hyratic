import { Loader2 } from "lucide-react";

import { Logo } from "@/components/logo";

function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <Logo />

        <Loader2 className="size-8 animate-spin text-primary" />

        <div>
          <h2 className="font-medium">Loading</h2>
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare your experience.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Loading;