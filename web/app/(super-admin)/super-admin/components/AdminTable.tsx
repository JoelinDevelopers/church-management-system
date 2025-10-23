// components/admins/AdminTable.tsx
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Mail, Phone, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AdminUser } from './AdminListing';

const ITEMS_PER_PAGE = 8;

interface AdminTableRowProps {
  admin: AdminUser;
}

function AdminTableRow({ admin }: AdminTableRowProps) {
  const getInitials = useCallback((name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, []);

  const formattedDate = useMemo(() => {
    return new Date(admin.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, [admin.createdAt]);

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={admin.image} alt={admin.name} />
            <AvatarFallback className="text-xs">
              {getInitials(admin.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{admin.name}</div>
            <Badge variant="secondary" className="text-xs">
              Admin
            </Badge>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2 text-sm">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>{admin.email}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2 text-sm">
          <Phone className="h-4 w-4 text-gray-500" />
          <span>{admin.phone}</span>
        </div>
      </TableCell>
      <TableCell className="text-sm text-gray-600">
        {formattedDate}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" aria-label="Open actions menu">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

interface AdminTableProps {
  admins: AdminUser[];
  searchTerm: string;
  isLoading?: boolean;
  onAddAdmin?: () => void;
}

export function AdminTable({ admins, searchTerm, isLoading = false, onAddAdmin }: AdminTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filter admins based on search term
  const filteredAdmins = useMemo(() => {
    if (!searchTerm) return admins;

    return admins.filter(admin =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [admins, searchTerm]);

  // Calculate pagination
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredAdmins.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredAdmins.length);
    const paginatedAdmins = filteredAdmins.slice(startIndex, endIndex);

    return { totalPages, startIndex, endIndex, paginatedAdmins };
  }, [filteredAdmins, currentPage]);

  const { totalPages, paginatedAdmins } = paginationData;

  // Generate page numbers for pagination
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  // Memoize row component
  const memoizedRow = useCallback((admin: AdminUser) => (
    <AdminTableRow key={admin.id} admin={admin} />
  ), []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Administrators</CardTitle>
        <CardDescription>
          Manage all system administrators and their permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admin</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-[80px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedAdmins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center space-y-3">
                        <Users className="h-12 w-12 text-gray-300" />
                        <div className="text-center">
                          <p className="font-medium text-gray-900">No admins found</p>
                          <p className="text-gray-500 mt-1">
                            {searchTerm 
                              ? `No results for "${searchTerm}". Try adjusting your search.`
                              : 'Get started by adding your first administrator.'
                            }
                          </p>
                        </div>
                        {!searchTerm && onAddAdmin && (
                          <Button onClick={onAddAdmin}>Add Admin</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedAdmins.map(memoizedRow)
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination and Results Count */}
          <div className="flex items-center justify-between">
            {/* Results count */}
            <div className="text-sm text-gray-500">
              Showing {paginatedAdmins.length} of {filteredAdmins.length} admins
              {searchTerm && ` (filtered from ${admins.length} total)`}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  Previous
                </Button>

                {/* Page Numbers */}
                {pageNumbers.map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                    aria-label={`Page ${page}`}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}