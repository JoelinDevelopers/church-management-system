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

const gradientMap: Record<string, string> = {
  "sunday-service": "from-blue-500/10 to-blue-600/5",
  "bible-study": "from-green-500/10 to-green-600/5",
  "prayer-meeting": "from-red-500/10 to-red-600/5",
  "worship-night": "from-purple-500/10 to-purple-600/5",
  "childrens-ministry": "from-pink-500/10 to-pink-600/5",
  "youth-fellowship": "from-orange-500/10 to-orange-600/5",
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
      sectionRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      setTimeout(() => {
        setShowAll(false)
      }, 300)
    } else {
      setShowAll(true)
    }
  }

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-br from-background to-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4 rounded-full" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-border/40 bg-card/50 backdrop-blur-sm">
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-background to-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 bg-red-50 dark:bg-red-950/50 px-6 py-4 rounded-lg inline-block backdrop-blur-sm border border-red-200 dark:border-red-800">
              Error loading programs
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!programs || programs.length === 0) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-br from-background to-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-muted-foreground">No programs available at this time</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-br from-background via-blue-50/20 to-green-50/20 dark:from-background dark:via-blue-950/10 dark:to-green-950/10">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <Badge 
            variant="secondary" 
            className="mb-4 px-4 py-2 text-sm font-semibold bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-sm"
          >
            ✨ Our Ministries
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Church Programs & Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-4 border border-border/50">
            Join our vibrant community through various programs designed to nurture faith, build relationships, and serve others
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedPrograms?.map((program: ServicesData, index: number) => {
            const Icon = iconMap[program.icon]
            const iconColor = colorMap[program.icon] || "text-primary bg-primary/10"
            const gradient = gradientMap[program.icon] || "from-primary/10 to-primary/5"
            
            return (
              <Card
                key={index}
                className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-border/30 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden"
              >
                {/* Animated Gradient Border */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg -z-10`}></div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Top Accent Bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient.replace('/10', '').replace('/5', '')} opacity-80`}></div>
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${iconColor}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      {program.time}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold mt-4 group-hover:text-primary transition-colors duration-300 bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Weekly Program
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0 relative z-10">
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
                    {program.description}
                  </p>
                  <Link href={`/programs/${program.id}`}>
                    <Button
                      variant="outline"
                      className="w-full group/btn border-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg transition-all duration-300 font-medium"
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
              className="gap-2 border-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-xl transition-all duration-300 px-8 py-6 text-base font-semibold group relative overflow-hidden"
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {showAll ? (
                <>
                  <ChevronUp className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">Show Less Programs</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">View All Programs ({programs.length})</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}