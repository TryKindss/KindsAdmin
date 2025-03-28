"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  const handleReload = () => {
    reset();
    window.location.reload();
  };

  const handleRedirectToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">
            Oops! Out of Session.
          </h1>
          <p className="text-muted-foreground">
            Kindly login to start a new session or reload your browser
          </p>
        </div>

        <div className="flex flex-col gap-4 min-w-[200px]">
          <Button
            variant="default"
            onClick={handleReload}
            className="w-full hover:bg-black/90"
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={handleRedirectToLogin}
            className="w-full"
          >
            Return to Login
          </Button>
        </div>
      </div>
    </div>
  );
}
