// components/churches/ChurchListing.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useChurchesData } from "@/hooks/use-church";
import { Search, RefreshCw, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChurchTable } from './ChurchTable';
import { ChurchTableSkeleton } from './ChurchTable';
import { ErrorState } from './ChurchTable';
import { EmptyState } from './ChurchTable';

export function ChurchList() {
  const { data: churches, isLoading, error, refetch, isRefetching } = useChurchesData();
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
        </div>
        <ChurchTableSkeleton />
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!churches || churches.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* First row: Title and Create Church button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Church Management
          </h2>
          <p className="text-gray-500">
            {churches.length || 0} church{(churches.length || 0) !== 1 ? "es" : ""}.
            Manage all registered churches and their subdomains
          </p>
        </div>

        <Button href="/super-admin/churches/new">

          <Plus className="h-4 w-4 mr-2" />
          Add New Church
        </Button>
      </div>

      {/* Second row: Search and Refresh - Search takes remaining space */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search churches by name or subdomain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Button
          onClick={() => refetch()}
          variant="outline"
          disabled={isRefetching}
          size="sm"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <ChurchTable churches={churches} searchTerm={searchTerm} />
    </div>
  );
}