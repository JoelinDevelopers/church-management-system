"use client"

import { Users, BookOpen, Heart, Music, Baby, Sparkles, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

export default function Services() {
  const { data: programs, isLoading, error } = useQuery({
    queryKey: ["servicesData"],
    queryFn: getServicesData,
  })

  if (isLoading) {
    return (
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-muted-foreground">Loading services...</div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-red-600">Error loading services: {error.message}</div>
          </div>
        </div>
      </section>
    )
  }

  if (!programs || programs.length === 0) {
    return (
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-muted-foreground">No services data available</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Our Programs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Join us in one of our many programs designed to help you grow in faith and fellowship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program: ServicesData, index: number) => {
            const Icon = iconMap[program.icon]
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <CardHeader>
                  <div
                    className={`h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${program.color}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-primary">{program.time}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">{program.description}</p>
                  <Link href={`/programs/${program.id}`}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}