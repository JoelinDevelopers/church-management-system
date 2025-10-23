// components/admins/AdminListing.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, MoreVertical, Filter, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  createdAt: string;
  role: string;
  status: string;
}

// Mock data
const mockAdmins: AdminUser[] = [
  {
    id: 'cmggy0w3d0002a8gx4rw33szr',
    name: 'Lilian Ochuku',
    email: 'workassets47@gmail.com',
    phone: '0700915361',
    image: '',
    createdAt: '2025-10-07',
    role: 'ADMIN',
    status: 'Active'
  },
  {
    id: 'cmgkse6qz00018feb8lqawuvv',
    name: 'Nancy Obiero',
    email: 'nancyobiero@gmail.com',
    phone: '0700915564',
    image: '',
    createdAt: '2025-10-10',
    role: 'ADMIN',
    status: 'Active'
  }
];

export default function AdminListing({churchId}: {churchId: string}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [admins, setAdmins] = useState<AdminUser[]>(mockAdmins);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = 
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.phone.includes(searchTerm);
    
    const matchesRole = roleFilter === 'all' || admin.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || admin.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAdmins = filteredAdmins.slice(startIndex, endIndex);

  const handleEdit = (adminId: string) => {
    console.log('Edit admin:', adminId);
    // Implement edit functionality
  };

  const handleDeleteClick = (adminId: string) => {
    setAdminToDelete(adminId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (adminToDelete) {
      setAdmins(prev => prev.filter(admin => admin.id !== adminToDelete));
      setDeleteDialogOpen(false);
      setAdminToDelete(null);
    }
  };

  const resetFilters = () => {
    setRoleFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  const activeFilters = [
    roleFilter !== 'all' && `Role: ${roleFilter}`,
    statusFilter !== 'all' && `Status: ${statusFilter}`
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
              Admin Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your system administrators
            </p>
          </div>
          <Button 
            asChild
            className="bg-primary hover:bg-blue-800 text-white gap-2"
            href={`/super-admin/churches/${churchId}/admins/new`}
          >
              <UserPlus className="h-4 w-4" />
              Add New Admin
           
          </Button>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Administrators
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  {filteredAdmins.length} admins found
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Search Input */}
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search admins..."
                    className="pl-10 border-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu open={showFilterMenu} onOpenChange={setShowFilterMenu}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="border-gray-300 relative"
                    >
                      <Filter className="h-4 w-4" />
                      {activeFilters.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                          {activeFilters.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Filter by Role
                        </label>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                            <SelectItem value="MODERATOR">Moderator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Filter by Status
                        </label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="Suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={resetFilters}
                          className="flex-1"
                        >
                          Reset
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => setShowFilterMenu(false)}
                          className="flex-1 bg-blue-900 hover:bg-blue-800"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFilters.length > 0 && (
              <div className="mb-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">Active filters:</span>
                {activeFilters.map((filter, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {filter}
                  </Badge>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-blue-600 hover:text-blue-800 h-6 px-2"
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-600 uppercase tracking-wider px-6 py-3">
                      Admin
                    </th>
                    <th className="text-left text-xs font-medium text-gray-600 uppercase tracking-wider px-6 py-3">
                      Contact
                    </th>
                    <th className="text-left text-xs font-medium text-gray-600 uppercase tracking-wider px-6 py-3">
                      Role
                    </th>
                    <th className="text-left text-xs font-medium text-gray-600 uppercase tracking-wider px-6 py-3">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-600 uppercase tracking-wider px-6 py-3">
                      Joined
                    </th>
                    <th className="text-left text-xs font-medium text-gray-600 uppercase tracking-wider px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedAdmins.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        No administrators found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    paginatedAdmins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={admin.image} />
                              <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                                {getInitials(admin.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">
                                {admin.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {admin.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="text-gray-900">{admin.email}</div>
                            <div className="text-gray-500">{admin.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-0 font-medium">
                            {admin.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-50 text-green-700 hover:bg-green-50 border-0 font-medium">
                            {admin.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatDate(admin.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => handleEdit(admin.id)}
                                className="cursor-pointer"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Admin
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteClick(admin.id)}
                                className="cursor-pointer text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Admin
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredAdmins.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredAdmins.length)} of {filteredAdmins.length} results
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-blue-900 hover:bg-blue-800" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the administrator
              account and remove their access from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}