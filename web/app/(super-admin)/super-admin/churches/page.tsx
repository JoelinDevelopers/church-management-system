import { Metadata } from "next";
import { Suspense } from "react";
import { ChurchList } from "../components/ChurchListing";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";



export const metadata: Metadata = {
  title: "Churches - Church Management",
  description: "View and manage all registered churches",
};

function ChurchListFallback() {
  return(
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({length: 6}).map((_, index) =>(
        <div key={index} className="p-6 border rounded-lg animate-pulse">
          <div className="h-6 bg-gray-200 rounded-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ChurchesPage() {
  return (
    <div className="container max-w-5xl mx-auto p-8">
       
      <Suspense fallback={<ChurchListFallback />}>
        <ChurchList/>
      </Suspense>
    </div>
  ); 
}