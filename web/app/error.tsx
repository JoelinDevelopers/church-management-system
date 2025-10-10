"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error() {
  const router = useRouter();

  return (
    <div className="h-screen bg-red-50 flex justify-center items-center">
      <main className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <AlertTriangle className="w-16 h-16 text-red-600" />
              <div className="absolute -inset-2 bg-red-100 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-gray-900">
              Failed to Load Page
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              We encountered an unexpected error while loading this page. 
              This might be due to a temporary network issue or server problem.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="bg-red-600 text-white hover:bg-red-700 shadow-sm"
              onClick={() => router.refresh()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            
            <Button
              variant="outline"
              className="border-red-200 text-red-700 hover:bg-red-100"
              onClick={() => router.push("/")}
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}