"use client"
import { getContactData } from '@/lib/subdomain-landing';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Phone, Mail, MapPin, LucideIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Icon mapping helper
const iconMap: Record<string, LucideIcon> = {
  Phone: Phone,
  Mail: Mail,
  MapPin: MapPin,
}

// Color mapping helper
const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  red: { bg: "bg-red-100", text: "text-red-600" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
}

export default function ContactSection() {
    const { data: contactData, isLoading, error } = useQuery({
        queryKey: ["contactData"],
        queryFn: getContactData,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-gray-500">Loading contact information...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-red-600">Error loading contact information: {error.message}</div>
                    </div>
                </div>
            </section>
        );
    }

    if (!contactData || contactData.length === 0) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-gray-500">No contact information available</div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                    <p className="text-xl text-gray-600">
                        Have questions? Our team is here to help you transform your parish management.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contactData.map((method) => {
                        const Icon = iconMap[method.icon] || Phone;
                        const colors = colorMap[method.iconColor] || colorMap.blue;

                        return (
                            <div
                                key={method.id}
                                className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
                            >
                                <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                                    <Icon className={`h-8 w-8 ${colors.text}`} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
                                <p className="text-gray-600 mb-4">{method.description}</p>

                                {/* Primary and Secondary values */}
                                <div className="space-y-1">
                                    {method.type === "phone" && (
                                        <>
                                            <a
                                                href={`tel:${method.primary.replace(/\D/g, '')}`}
                                                className={`block ${colors.text} font-semibold text-lg hover:underline`}
                                            >
                                                {method.primary}
                                            </a>
                                            {method.secondary && (
                                                <a
                                                    href={`tel:${method.secondary.replace(/\D/g, '')}`}
                                                    className={`block ${colors.text} font-semibold text-lg hover:underline`}
                                                >
                                                    {method.secondary}
                                                </a>
                                            )}
                                        </>
                                    )}
                                    {method.type === "email" && (
                                        <a
                                            href={`mailto:${method.primary}`}
                                            className={`block ${colors.text} font-semibold text-lg hover:underline`}
                                        >
                                            {method.primary}
                                        </a>
                                    )}
                                    {method.type === "location" && (
                                        <div className={`${colors.text} font-semibold`}>
                                            <p>{method.primary}</p>
                                            {method.secondary && <p>{method.secondary}</p>}
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                {method.details && (
                                    <p className="text-sm text-gray-500 mt-2">{method.details}</p>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12">
                    <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                            Need Immediate Assistance?
                        </h3>
                        <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
                            Our technical support team is available 24/7 for urgent parish needs. We're committed to ensuring your parish management runs smoothly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                                Start Live Chat
                            </Button>
                            <Button
                                variant="outline"
                                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-lg bg-transparent"
                            >
                                Schedule a Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}