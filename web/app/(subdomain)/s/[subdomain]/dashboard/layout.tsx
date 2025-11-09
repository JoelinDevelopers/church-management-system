import { getServerUser } from "@/actions/auth";
import Navbar from "@/app/(super-admin)/super-admin/components/Navbar";
import Sidebar from "@/app/(super-admin)/super-admin/components/Sidebar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getServerUser();
    if (!user) {
      redirect("/auth/login");
    }
  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen md:block">
        <Sidebar role={user.role}/>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-[220px] lg:ml-[280px]">
        <Navbar user={user} />
        <div className="bg-gray-50">{children}</div>
      </main>
    </div>
  );
}
