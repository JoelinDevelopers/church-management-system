"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export default function SettingsNavigation({ churchId }: {churchId:string}) {
  const [activeTab, setActiveTab] = useState('Overview');
  const pathname = usePathname();
//   const tab1 = pathname.split("/").at(-1);

  const tabs = [
    { name: 'Overview', href: `/super-admin/churches/${churchId}` },
    { name: 'Admins', href: `/super-admin/churches/${churchId}/admins` },
    { name: 'Billing', href: `/super-admin/churches/${churchId}/billing` },
    { name: 'Members', href: `/super-admin/churches/${churchId}/members` },
    { name: 'Website', href: `/super-admin/churches/${churchId}/website` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        {/* Tab Navigation */}
              <div className="border-b border-gray-200 mb-8">
                  <nav className="flex gap-8">
                      {tabs.map((tab) => {
                        const activeTab = pathname === tab.href;
                          return (
                              (
                                  <Link
                                      key={tab.name}
                                      href={tab.href}

                                      className={`pb-4 px-1 text-sm font-medium transition-colors relative ${activeTab
                                              ? 'text-indigo-600'
                                              : 'text-gray-500 hover:text-gray-700'
                                          }`}
                                  >
                                      {tab.name}
                                      {activeTab  && (
                                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
                                      )}
                                  </Link>
                              )
                          )
                      })}
                  </nav>
              </div>

        {/* Content Area */}
        {/* {activeTab === 'Overview' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Overview</h2>
            <p className="text-gray-600">Welcome to your dashboard overview.</p>
          </div>
        )}

        {activeTab === 'Admins' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Management</h2>
            <p className="text-gray-600">Manage administrator accounts and permissions here.</p>
          </div>
        )}

        {activeTab === 'Billing' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Billing Information</h2>
            <p className="text-gray-600">View and manage your billing details and subscription.</p>
          </div>
        )}

        {activeTab === 'Members' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Team Members</h2>
            <p className="text-gray-600">Invite and manage team members and their access levels.</p>
          </div>
        )}

        {activeTab === 'Website' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Website Settings</h2>
            <p className="text-gray-600">Configure your website preferences and integrations.</p>
          </div>
        )} */}
      </div>
    </div>
  );
}