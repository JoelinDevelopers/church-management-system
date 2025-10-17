import type React from "react";

import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import { User } from "lucide-react";
import { SuperAdminSidebar } from "./super-admin/components/SuperAdminSidebar";

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();
  if (!user) {
    redirect("/auth/login");
  }
  return (
    <SidebarProvider>
      <SuperAdminSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader user={user} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
