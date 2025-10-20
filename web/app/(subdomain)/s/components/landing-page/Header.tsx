"use client"
import { getHeaderData } from '@/lib/subdomain-landing';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Church, Phone, Mail, LogIn, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Header() {
    const { data: headerData, isLoading, error } = useQuery({
        queryKey: ["headerData"],
        queryFn: getHeaderData,
    });

    if (isLoading) {
        return (
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container px-4">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-12 w-12 rounded-xl" />
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-20" />
                            <Skeleton className="h-10 w-24" />
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    if (error) {
        return (
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container px-4">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                                <Church className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Church</span>
                                <Badge variant="destructive" className="w-fit text-xs">Error</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    if (!headerData) {
        return (
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container px-4">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                                <Church className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">Church</span>
                                <span className="text-xs text-muted-foreground">No data available</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="container px-4">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo and Church Name */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                            <Church className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight">{headerData.logo}</span>
                            <span className="text-xs text-muted-foreground mt-0.5">{headerData.slogan}</span>
                        </div>
                    </Link>

                    {/* Contact Details and Actions */}
                    <div className="flex items-center gap-6">
                        {/* Contact Info - Clean circular icons */}
                        <div className="hidden lg:flex items-center gap-4 mr-4">
                            <a
                                href={`tel:${headerData.phone.replace(/\D/g, '')}`}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-200 group"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                                    <Phone className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-sm font-medium">{headerData.phone}</span>
                            </a>

                            <a
                                href={`mailto:${headerData.email}`}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-200 group"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-green-600 dark:text-green-400 group-hover:bg-green-100 dark:group-hover:bg-green-900 transition-colors">
                                    <Mail className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-sm font-medium">{headerData.email}</span>
                            </a>
                        </div>

                        {/* Mobile Contact Icons */}
                        <div className="flex lg:hidden items-center gap-3 mr-2">
                            <a
                                href={`tel:${headerData.phone.replace(/\D/g, '')}`}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                            >
                                <Phone className="h-3.5 w-3.5" />
                            </a>
                            <a
                                href={`mailto:${headerData.email}`}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                            >
                                <Mail className="h-3.5 w-3.5" />
                            </a>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <Button 
                                href='/auth/login'
                                variant="outline" 
                                size="default" 
                                className="gap-2 border-2 h-10 px-4 bg-background hover:bg-accent transition-all duration-200 shadow-sm"
                            >
                                <LogIn className="h-4 w-4" />
                                <span className="hidden sm:inline font-medium">Login</span>
                            </Button>
                            <Button 
                                size="default" 
                                className="gap-2 h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                            >
                                <Heart className="h-4 w-4" />
                                <span>Donate</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}