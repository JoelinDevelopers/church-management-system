"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SettingsNavigation({ churchId }: { churchId: string }) {
  const pathname = usePathname();

  const tabs = [
    { name: "Overview", href: `/super-admin/churches/${churchId}` },
    { name: "Admins", href: `/super-admin/churches/${churchId}/admins` },
    { name: "Billing", href: `/super-admin/churches/${churchId}/billing` },
    { name: "Members", href: `/super-admin/churches/${churchId}/members` },
    { name: "Website", href: `/super-admin/churches/${churchId}/website` },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Settings</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive =
              pathname === tab.href ||
              (tab.name === "Overview" &&
                pathname === `/super-admin/churches/${churchId}`);

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`relative pb-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
