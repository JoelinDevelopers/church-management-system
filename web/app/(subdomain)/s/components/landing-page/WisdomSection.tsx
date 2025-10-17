"use client"

import { getWisdomData } from '@/lib/subdomain-landing';
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from "react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function WisdomSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data: wisdomData, isLoading, error } = useQuery({
    queryKey: ["wisdomData"],
    queryFn: getWisdomData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (wisdomData && wisdomData.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % wisdomData.length)
      }, 8000)
      return () => clearInterval(timer)
    }
  }, [wisdomData])

  const goToPrevious = () => {
    if (wisdomData) {
      setCurrentIndex((prev) => (prev - 1 + wisdomData.length) % wisdomData.length)
    }
  }

  const goToNext = () => {
    if (wisdomData) {
      setCurrentIndex((prev) => (prev + 1) % wisdomData.length)
    }
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-muted-foreground">Loading wisdom...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-red-600">Error loading wisdom: {error.message}</div>
          </div>
        </div>
      </section>
    );
  }

  if (!wisdomData || wisdomData.length === 0) {
    return (
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Leaders' Wisdom</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              No wisdom nuggets available at this time.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-4">
            <Quote className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Words of Wisdom</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Leaders' Wisdom</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Inspiring insights and spiritual guidance from our church leaders
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="relative min-h-[300px] flex items-center">
                {wisdomData.map((nugget, index) => (
                  <div
                    key={nugget.id}
                    className={`absolute inset-0 transition-all duration-700 ${
                      index === currentIndex
                        ? "opacity-100 translate-x-0"
                        : index < currentIndex
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Quote className="h-12 w-12 text-primary/20 mb-6" />

                      <blockquote className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-8 leading-relaxed text-balance">
                        "{nugget.quote}"
                      </blockquote>

                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-20 w-20 border-4 border-primary/20">
                          <AvatarImage src={nugget.image || "/placeholder.svg"} alt={nugget.author} />
                          <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                            {nugget.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="font-bold text-lg text-foreground">{nugget.author}</p>
                          <p className="text-sm text-muted-foreground">{nugget.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="h-10 w-10 rounded-full bg-transparent"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <div className="flex gap-2">
                  {wisdomData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? "w-8 bg-primary"
                          : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                      aria-label={`Go to wisdom ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="h-10 w-10 rounded-full bg-transparent"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}