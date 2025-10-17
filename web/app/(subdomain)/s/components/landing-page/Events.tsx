"use client"
import { getEventsData } from '@/lib/subdomain-landing';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Events() {
    const { data: eventsData, isLoading, error } = useQuery({
        queryKey: ["eventsData"],
        queryFn: getEventsData,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return (
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-muted-foreground">Loading events...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-red-600">Error loading events: {error.message}</div>
                    </div>
                </div>
            </section>
        );
    }

    if (!eventsData || eventsData.length === 0) {
        return (
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Upcoming Events</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                            No upcoming events at this time. Check back soon!
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Upcoming Events</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                        Don't miss out on these exciting opportunities to connect, grow, and serve
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventsData.map((event) => (
                        <Card
                            key={event.id}
                            className="group overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={event.image || "/placeholder.svg"}
                                    alt={event.title}
                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-accent text-accent-foreground">{event.category}</Badge>
                                </div>
                                {event.featured && (
                                    <div className="absolute top-4 right-4">
                                        <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                                    </div>
                                )}
                            </div>

                            <CardHeader className="flex-grow">
                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                    {event.title}
                                </h3>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-primary" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <p className="text-muted-foreground mt-4 leading-relaxed">{event.description}</p>
                            </CardHeader>

                            <CardFooter>
                                <Link href={`/events/${event.id}`} className="w-full">
                                    <Button className="w-full group/btn">
                                        Learn More & Register
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}