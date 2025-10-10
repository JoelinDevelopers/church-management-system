// app/subdomain/[subdomain]/SubdomainContent.tsx
'use client';

import Link from 'next/link';
import { protocol, rootDomain } from '@/lib/utils';
import { useSubdomainData } from '@/hooks/use-church';
import { ChurchBrief } from '@/types/church.schema';
 

interface SubdomainContentProps {
  subdomain: string;
  initialData: ChurchBrief | null;
}

export default function SubdomainContent({ subdomain, initialData }: SubdomainContentProps) {
  const { data: subdomainData, isLoading, error } = useSubdomainData(subdomain);

  // Use the data from React Query, fallback to initialData
  const data = subdomainData || initialData;

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg text-red-600">Error loading subdomain data</div>
          </div>
        </div>
      </div>
    );
  }

  // Add null check here
  if (!data) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg text-red-600">Subdomain not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="absolute top-4 right-4">
        <Link
          href={`${protocol}://${rootDomain}`}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {rootDomain}
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-9xl mb-6">{data.name}</div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome to {subdomain}.{rootDomain}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            This is your custom subdomain page
          </p>
        </div>
      </div>
    </div>
  );
}