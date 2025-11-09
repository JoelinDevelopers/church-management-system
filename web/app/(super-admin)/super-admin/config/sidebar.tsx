import {
  Truck,
  FileText,
  BarChart3,
  Users,
  Settings,
  Package,
  Anchor,
  PlaneLanding,
  MessageCircle,
  MessageCircleCode,
  Shield,
  UserCheck,
  Building2,
} from "lucide-react";
import type { JSX } from "react";

export interface ISidebarLink {
  name: string;
  path: string;
  icon: JSX.Element;
  roles: string[]; // Keep for backward compatibility
}

export const navItems: ISidebarLink[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <BarChart3 size={20} />,
    roles: ["ADMIN", "STAFF", "AGENT", "USER"],
  },
  {
    name: "Churches",
    path: "/super-admin/churches",
    icon: <Building2 size={20} />,
    roles: ["SUPER_ADMIN"],
  },
  // {
  //   name: "Shipments",
  //   path: "/dashboard/shipments-trakit",
  //   icon: <Package size={20} />,
  //   roles: ["ADMIN", "STAFF", "AGENT"],
  // },
  // {
  //   name: "Sea Freight",
  //   path: "/dashboard/sea-freights",
  //   icon: <Anchor size={20} />,
  //   roles: ["ADMIN", "STAFF", "AGENT"],
  // },
  {
    name: "Users",
    path: "/dashboard/users",
    icon: <Users size={20} />,
    roles: ["ADMIN"],
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <Settings size={20} />,
    roles: ["ADMIN"],
  },
];
