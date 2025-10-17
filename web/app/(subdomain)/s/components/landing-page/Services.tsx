"use client"

import { Users, BookOpen, Heart, Music, Baby, Sparkles, ArrowRight, Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useRef } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getServicesData, type ServicesData } from "@/lib/subdomain-landing"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "sunday-service": Users,
  "bible-study": BookOpen,
  "prayer-meeting": Heart,
  "worship-night": Music,
  "childrens-ministry": Baby,
  "youth-fellowship": Sparkles,
}

const colorMap: Record<string, string> = {
  "sunday-service": "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400",
  "bible-study": "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400",
  "prayer-meeting": "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400",
  "worship-night": "text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400",
  "childrens-ministry": "text-pink-600 bg-pink-50 dark:bg-pink-950 dark:text-pink-400",
  "youth-fellowship": "text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400",
}

export default function Services() {
  const [showAll, setShowAll] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { data: programs, isLoading, error } = useQuery({
    queryKey: ["servicesData"],
    queryFn: getServicesData,
  })

  // Show only first 6 programs initially, or all if showAll is true
  const displayedPrograms = showAll ? programs : programs?.slice(0, 6)

  const handleShowToggle = () => {
    if (showAll) {
      // If currently showing all, scroll to top first then hide
      sectionRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      // Small delay to allow scroll to complete before hiding cards
      setTimeout(() => {
        setShowAll(false)
      }, 300)
    } else {
      // If showing limited, just show all
      setShowAll(true)
    }
  }

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-border/40">
                <CardHeader>
                  <Skeleton className="h-14 w-14 rounded-xl mb-4" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 md:py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 bg-red-50 dark:bg-red-950/50 px-6 py-4 rounded-lg inline-block">
              Error loading programs
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!programs || programs.length === 0) {
    return (
      <section className="py-16 md:py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-muted-foreground">No programs available at this time</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
            Our Ministries
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Church Programs & Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Join our vibrant community through various programs designed to nurture faith, build relationships, and serve others
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedPrograms?.map((program: ServicesData, index: number) => {
            const Icon = iconMap[program.icon]
            const iconColor = colorMap[program.icon] || "text-primary bg-primary/10"
            
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${iconColor}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="text-xs font-normal">
                      <Clock className="h-3 w-3 mr-1" />
                      {program.time}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold mt-4 group-hover:text-primary transition-colors">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Weekly Program
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {program.description}
                  </p>
                  <Link href={`/programs/${program.id}`}>
                    <Button
                      variant="outline"
                      className="w-full group/btn border-2 bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 font-medium"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Show More/Less Button */}
        {programs && programs.length > 6 && (
          <div className="text-center mt-12 md:mt-16">
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleShowToggle}
              className="gap-2 border-2 bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 px-8 py-6 text-base font-semibold group"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-5 w-5" />
                  Show Less Programs
                </>
              ) : (
                <>
                  <ChevronDown className="h-5 w-5" />
                  View All Programs ({programs.length})
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}