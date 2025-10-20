"use client"

import { getWisdomData } from '@/lib/subdomain-landing';
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from "react"
import { Quote, ChevronLeft, ChevronRight, Sparkles, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
      <section className="py-16 md:py-20 bg-gradient-to-br from-background via-amber-50/20 to-stone-50/20 dark:from-background dark:via-amber-950/10 dark:to-stone-950/10 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-stone-200/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-muted-foreground bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-4 border border-border/50 font-serif">
              Loading wisdom...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-br from-background via-amber-50/20 to-stone-50/20 dark:from-background dark:via-amber-950/10 dark:to-stone-950/10 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-stone-200/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-red-600 bg-red-50/80 dark:bg-red-950/50 backdrop-blur-sm rounded-2xl px-6 py-4 border border-red-200 dark:border-red-800 font-serif">
              Error loading wisdom
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!wisdomData || wisdomData.length === 0) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-br from-background via-amber-50/20 to-stone-50/20 dark:from-background dark:via-amber-950/10 dark:to-stone-950/10 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-stone-200/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Badge 
              variant="secondary" 
              className="mb-4 px-4 py-2 text-sm font-semibold bg-amber-50/80 dark:bg-amber-950/80 backdrop-blur-sm border-amber-200 dark:border-amber-800 shadow-sm font-serif"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Ancient Wisdom
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance bg-gradient-to-br from-amber-900 to-stone-700 dark:from-amber-200 dark:to-stone-300 bg-clip-text text-transparent font-serif">
              Sacred Manuscripts
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto text-balance bg-amber-50/50 dark:bg-amber-950/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-amber-200 dark:border-amber-800 font-serif">
              No wisdom scrolls available at this time.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-background via-amber-50/20 to-stone-50/20 dark:from-background dark:via-amber-950/10 dark:to-stone-950/10 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-stone-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-amber-100/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-stone-100/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <Badge 
            variant="secondary" 
            className="mb-4 px-4 py-2 text-sm font-semibold bg-amber-50/80 dark:bg-amber-950/80 backdrop-blur-sm border-amber-200 dark:border-amber-800 shadow-sm font-serif"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Ancient Scrolls
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance bg-gradient-to-br from-amber-900 to-stone-700 dark:from-amber-200 dark:to-stone-300 bg-clip-text text-transparent font-serif">
            Leaders' Wisdom
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto text-balance bg-amber-50/50 dark:bg-amber-950/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-amber-200 dark:border-amber-800 font-serif leading-relaxed">
            Timeless insights and spiritual guidance from our church elders
          </p>
        </div>

        <div className="max-w-5xl mx-auto"> {/* Increased from max-w-3xl to max-w-5xl */}
          <Card className="border-2 border-amber-200/50 dark:border-amber-800/50 bg-gradient-to-br from-amber-50/80 to-stone-50/80 dark:from-amber-950/30 dark:to-stone-950/30 backdrop-blur-sm shadow-xl relative overflow-hidden group min-h-[400px] md:min-h-[450px] flex items-center"> {/* Increased height */}
            {/* Parchment Texture Effect */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-30 mix-blend-multiply dark:opacity-20"></div>
            
            {/* Aged Paper Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200/10 via-transparent to-amber-300/5 opacity-40"></div>
            
            {/* Border Stitching Effect */}
            <div className="absolute inset-3 border border-amber-300/30 dark:border-amber-700/30 rounded-lg pointer-events-none"></div>

            <CardContent className="p-8 md:p-12 lg:p-16 relative z-10 w-full"> {/* Increased padding */}
              <div className="relative w-full">
                {wisdomData.map((nugget, index) => (
                  <div
                    key={nugget.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentIndex
                        ? "opacity-100 translate-x-0"
                        : index < currentIndex
                          ? "opacity-0 -translate-x-8"
                          : "opacity-0 translate-x-8"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center w-full">
                      {/* Quote Icon - Slightly larger */}
                      <div className="mb-6 relative">
                        <Quote className="h-10 w-10 text-amber-600/40 dark:text-amber-400/40" />
                      </div>

                      {/* Quote Text - Larger but still manuscript style */}
                      <blockquote className="text-xl md:text-2xl lg:text-3xl font-normal text-stone-800 dark:text-stone-200 mb-8 leading-relaxed text-balance font-serif italic tracking-wide max-w-4xl mx-auto">
                        <span className="text-amber-700 dark:text-amber-300 text-3xl md:text-4xl mr-3">"</span>
                        {nugget.quote}
                        <span className="text-amber-700 dark:text-amber-300 text-3xl md:text-4xl ml-3">"</span>
                      </blockquote>

                      {/* Author Section - Larger */}
                      <div className="flex flex-col items-center gap-4 group/author mb-8">
                        <Avatar className="h-20 w-20 border-2 border-amber-300/50 dark:border-amber-600/50 relative group-hover/author:scale-105 transition-transform duration-500 shadow-lg">
                          <AvatarImage src={nugget.image || "/placeholder.svg"} alt={nugget.author} />
                          <AvatarFallback className="text-lg bg-gradient-to-br from-amber-600 to-amber-800 text-amber-50 font-normal font-serif">
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>

                        <div className="bg-amber-100/50 dark:bg-amber-900/30 backdrop-blur-sm rounded-xl px-6 py-4 border border-amber-200 dark:border-amber-700">
                          <p className="font-medium text-lg text-stone-800 dark:text-stone-200 font-serif">
                            {nugget.author}
                          </p>
                          <p className="text-sm text-stone-600 dark:text-stone-400 font-normal font-serif mt-1">{nugget.role}</p>
                        </div>
                      </div>

                      {/* Navigation - Slightly larger */}
                      <div className="flex items-center justify-center gap-4 mt-6">
                        <Button
                          variant="outline"
                          size="default"
                          onClick={goToPrevious}
                          className="h-10 w-10 rounded-full bg-amber-100/50 dark:bg-amber-900/50 backdrop-blur-sm border-amber-300 dark:border-amber-700 hover:bg-amber-200 hover:border-amber-400 dark:hover:bg-amber-800 transition-all duration-300 group/btn"
                        >
                          <ChevronLeft className="h-4 w-4 text-amber-700 dark:text-amber-300 transition-transform duration-300 group-hover/btn:-translate-x-0.5" />
                        </Button>

                        {/* Indicators */}
                        <div className="flex gap-2">
                          {wisdomData.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentIndex(index)}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                  ? "w-8 bg-amber-600 dark:bg-amber-400 shadow-sm"
                                  : "w-2 bg-amber-300/50 dark:bg-amber-700/50 hover:bg-amber-400 dark:hover:bg-amber-600"
                              }`}
                              aria-label={`Go to wisdom ${index + 1}`}
                            />
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          size="default"
                          onClick={goToNext}
                          className="h-10 w-10 rounded-full bg-amber-100/50 dark:bg-amber-900/50 backdrop-blur-sm border-amber-300 dark:border-amber-700 hover:bg-amber-200 hover:border-amber-400 dark:hover:bg-amber-800 transition-all duration-300 group/btn"
                        >
                          <ChevronRight className="h-4 w-4 text-amber-700 dark:text-amber-300 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}