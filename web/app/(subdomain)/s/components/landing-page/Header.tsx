"use client"
import { getHeaderData } from '@/lib/subdomain-landing';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Church, Phone, Mail, LogIn, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Header() {
    const { data: headerData, isLoading, error } = useQuery({
        queryKey: ["headerData"],
        queryFn: getHeaderData,
    });

    if (isLoading) {
        return (
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4">
                    <div className="flex h-20 items-center justify-center">
                        <div className="text-muted-foreground">Loading header...</div>
                    </div>
                </div>
            </header>
        );
    }

    if (error) {
        return (
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4">
                    <div className="flex h-20 items-center justify-center">
                        <div className="text-red-600">Error loading header: {error.message}</div>
                    </div>
                </div>
            </header>
        );
    }

    if (!headerData) {
        return (
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4">
                    <div className="flex h-20 items-center justify-center">
                        <div className="text-muted-foreground">No header data available</div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo and Church Name */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
                            <Church className="h-7 w-7" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-foreground">{headerData.logo}</span>
                            <span className="text-xs text-muted-foreground">{headerData.slogan}</span>
                        </div>
                    </Link>

                    {/* Contact Details and Actions */}
                    <div className="flex items-center gap-6">
                        {/* Contact Info - Hidden on mobile */}
                        <div className="hidden lg:flex items-center gap-6 text-sm">
                            <a
                                href={`tel:${headerData.phone.replace(/\D/g, '')}`}
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Phone className="h-4 w-4" />
                                <span>{headerData.phone}</span>
                            </a>
                            <a
                                href={`mailto:${headerData.email}`}
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                <span>{headerData.email}</span>
                            </a>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="default" className="gap-2 bg-transparent">
                                <LogIn className="h-4 w-4" />
                                <span className="hidden sm:inline">Login</span>
                            </Button>
                            <Button size="default" className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
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