"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { getHeroCarouselData } from "@/lib/subdomain-landing"
import { Skeleton } from "@/components/ui/skeleton"

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data: carouselData, isLoading, error } = useQuery({
    queryKey: ["carouselData"],
    queryFn: getHeroCarouselData,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      if (carouselData && carouselData.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % carouselData.length)
      }
    }, 6000)
    return () => clearInterval(timer)
  }, [carouselData])

  const goToPrevious = () => {
    if (carouselData) {
      setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length)
    }
  }

  const goToNext = () => {
    if (carouselData) {
      setCurrentIndex((prev) => (prev + 1) % carouselData.length)
    }
  }

  if (isLoading) {
    return (
      <section className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-muted animate-pulse" />
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-8 w-40 mx-auto mb-6 rounded-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4 mx-auto rounded-lg" />
              <Skeleton className="h-6 w-40 mx-auto rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/subdomain-images/church-worship-congregation-praising.jpg" 
            alt="Church worship" 
            className="h-full w-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-red-200 text-sm bg-red-900/30 backdrop-blur-sm px-4 py-3 rounded-lg inline-block">
              Error loading carousel
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!carouselData || carouselData.length === 0) {
    return (
      <section className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/subdomain-images/church-worship-congregation-praising.jpg" 
            alt="Church worship" 
            className="h-full w-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-white text-sm">No carousel data available</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/subdomain-images/church-worship-congregation-praising.jpg" 
          alt="Church worship" 
          className="h-full w-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto w-full">
        <div className="max-w-4xl mx-auto text-center w-full space-y-6 md:space-y-8">
          {/* Badge - Moved up with better spacing */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-white border border-white/20">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-semibold">Daily Scripture</span>
          </div>

          {/* Scripture Carousel - Reduced height */}
          <div className="relative min-h-[180px] md:min-h-[220px] flex items-center justify-center w-full">
            {carouselData.map((scripture, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full transition-all duration-700 ease-in-out ${
                  index === currentIndex
                    ? "opacity-100 translate-x-0"
                    : index < currentIndex
                      ? "opacity-0 -translate-x-8"
                      : "opacity-0 translate-x-8"
                }`}
              >
                <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 w-full space-y-4 md:space-y-6">
                  {/* Scripture Text with quotation marks and different font */}
                  <div className="relative w-full max-w-3xl">
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic text-white mb-4 leading-snug md:leading-normal text-balance drop-shadow-2xl">
                      "{scripture.text}"
                    </p>
                  </div>
                  
                  {/* Scripture Reference with different font */}
                  <div className="relative">
                    <p className="text-base sm:text-lg md:text-xl text-white/90 font-sans font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                      — {scripture.reference}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation - Adjusted spacing */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 hover:border-white/50 text-white transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            {/* Indicators */}
            <div className="flex gap-1 md:gap-2">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to scripture ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 hover:border-white/50 text-white transition-all duration-200"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}