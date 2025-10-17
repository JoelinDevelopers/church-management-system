"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  LogOut,
  UserIcon,
  Settings,
  HelpCircle,
  ChevronDown,
  Check,
  CheckCheck,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
 

// import { NotificationType } from "@prisma/client";

import { formatDistanceToNow } from "date-fns";
import { logout } from "@/actions/auth";
import { User } from "@/types/auth2";
// import {
//   getNotifications,
//   markAllNotificationsAsRead,
//   markNotificationAsRead,
// } from "@/actions/notifactions";

export default function Navbar({ user }: { user: User }) {
  const router = useRouter();
//   const role = user.roles[0]?.roleName;
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notificationsOpen) {
      fetchNotifications();
    }
  }, [notificationsOpen]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
    //   const response = await getNotifications({ limit: 5 });
    //   if (response.success && response.data) {
    //     setNotifications(response.data);
    //   }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  async function handleLogout() {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const handleMenuItemClick = (path: string) => {
    setProfileOpen(false);
    router.push(path);
  };

//   const handleMarkAsRead = async (id: string) => {
//     try {
//       const response = await markNotificationAsRead(id);
//       if (response.success) {
//         fetchNotifications();
//       }
//     } catch (error) {
//       console.error("Failed to mark notification as read:", error);
//     }
//   };

//   const handleMarkAllAsRead = async () => {
//     try {
//       const response = await markAllNotificationsAsRead();
//       if (response.success) {
//         fetchNotifications();
//       }
//     } catch (error) {
//       console.error("Failed to mark all notifications as read:", error);
//     }
//   };

  const handleViewAllNotifications = () => {
    setNotificationsOpen(false);
    router.push("/dashboard/notifications");
  };

  // Get unread notifications count
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Get notification icon based on type
//   const getNotificationIcon = (type: NotificationType) => {
//     switch (type) {
//       case "DOCUMENT_ALERT":
//         return <Bell className="h-4 w-4 text-blue-500" />;
//       case "STATUS_CHANGE":
//         return <FileCheck className="h-4 w-4 text-green-500" />;
//       case "TASK_ASSIGNED":
//         return <User className="h-4 w-4 text-orange-500" />;
//       case "DEADLINE_APPROACHING":
//         return <Bell className="h-4 w-4 text-red-500" />;
//       default:
//         return <Bell className="h-4 w-4" />;
//     }
//   };

  return (
    <header className="bg-background/95 sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b px-2 backdrop-blur-sm lg:px-6">
      {/* Center - Search (only on desktop) */}
      <div className="mx-4 hidden w-full max-w-md md:block">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="text-muted-foreground h-4 w-4" />
          </div>
          <Input
            type="text"
            placeholder="Search shipments, documents, clients..."
            className="bg-muted/30 w-full pl-10 text-xs"
          />
        </div>
      </div>

      {/* Right side - Notifications and User Menu */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <Bell className="text-2xl" />
            {unreadCount > 0 && (
              <span className="bg-destructive absolute right-0 top-0 flex h-5 w-5 -translate-y-1/3 translate-x-1/3 transform items-center justify-center rounded-full text-xs text-white">
                {unreadCount}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>

          {/* {notificationsOpen && (
            <div className="bg-background absolute right-0 z-50 mt-2 w-80 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between border-b p-3">
                <h3 className="text-sm font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-xs"
                    onClick={handleMarkAllAsRead}
                  >
                    <CheckCheck className="mr-1 h-3 w-3" />
                    Mark all as read
                  </Button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="border-primary h-6 w-6 animate-spin rounded-full border-b-2"></div>
                  </div>
                ) : notifications.length > 0 ? (
                  <div>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "hover:bg-muted/50 flex cursor-pointer border-b p-3 transition-colors",
                          !notification.isRead &&
                            "bg-blue-50 dark:bg-blue-900/10"
                        )}
                      >
                        <div className="mr-3 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium">
                              {notification.title}
                            </h4>
                            <div className="flex items-center">
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() =>
                                    handleMarkAsRead(notification.id)
                                  }
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-xs">
                            {notification.message}
                          </p>
                          <span className="text-muted-foreground mt-1 block text-xs">
                            {formatDistanceToNow(
                              new Date(notification.timestamp),
                              { addSuffix: true }
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground p-4 text-center text-sm">
                    No notifications
                  </p>
                )}
              </div>
              <div className="border-t p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs"
                  onClick={handleViewAllNotifications}
                >
                  View all notifications
                </Button>
              </div>
            </div>
          )} */}
        </div>

        {/* User Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            className="flex items-center space-x-2 rounded-full"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full font-medium">
              {user.name?.charAt(0)}
            </div>
            <div className="hidden flex-col items-start md:flex">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-muted-foreground text-xs capitalize">
                {user.role}
              </span>
            </div>
            <ChevronDown
              className={`text-muted-foreground hidden h-4 w-4 transition-transform duration-200 md:block ${
                profileOpen ? "rotate-180 transform" : ""
              }`}
            />
          </Button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="bg-background absolute right-0 z-50 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="border-b px-4 py-3">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-muted-foreground text-xs">
                  {user.email}
                </p>
              </div>
              <div className="py-1">
                <Button
                  variant="ghost"
                  onClick={() => handleMenuItemClick("/dashboard/settings")}
                  className="text-foreground flex w-full items-center justify-start px-4 py-2 text-sm font-normal"
                >
                  <UserIcon className="mr-3 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleMenuItemClick("/dashboard/settings")}
                  className="text-foreground flex w-full items-center justify-start px-4 py-2 text-sm font-normal"
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    window.open("https://wa.me/1234567890", "_blank");
                  }}
                  className="text-foreground flex w-full items-center justify-start px-4 py-2 text-sm font-normal"
                >
                  <HelpCircle className="mr-3 h-4 w-4" />
                  Help & Support
                </Button>
              </div>
              <div className="border-t py-1">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-destructive hover:bg-destructive/10 flex w-full items-center justify-start px-4 py-2 text-sm font-normal"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
