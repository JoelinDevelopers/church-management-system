"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { getHeroCarouselData } from "@/lib/subdomain-landing"


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
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/church-worship-congregation-praising.jpg" alt="Church worship" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        </div>
        <div className="container relative z-10 mx-auto px-4 flex items-center justify-center">
          <div className="text-primary-foreground text-lg">Loading carousel...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/church-worship-congregation-praising.jpg" alt="Church worship" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        </div>
        <div className="container relative z-10 mx-auto px-4 flex items-center justify-center">
          <div className="text-red-200 text-lg">Error loading carousel: {error.message}</div>
        </div>
      </section>
    )
  }

  if (!carouselData || carouselData.length === 0) {
    return (
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/church-worship-congregation-praising.jpg" alt="Church worship" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        </div>
        <div className="container relative z-10 mx-auto px-4 flex items-center justify-center">
          <div className="text-primary-foreground text-lg">No carousel data available</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/church-worship-congregation-praising.jpg" alt="Church worship" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-accent-foreground backdrop-blur-sm">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm font-medium">Daily Scripture</span>
          </div>

          {/* Scripture Carousel */}
          <div className="relative min-h-[280px] flex items-center justify-center">
            {carouselData.map((scripture, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentIndex
                    ? "opacity-100 translate-x-0"
                    : index < currentIndex
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                }`}
              >
                <div className="flex flex-col items-center justify-center h-full px-4">
                  <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-relaxed text-balance">
                    "{scripture.text}"
                  </p>
                  <p className="text-lg md:text-xl text-accent-foreground font-semibold">— {scripture.reference}</p>
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
              className="h-12 w-12 rounded-full bg-background/20 backdrop-blur-sm border-primary-foreground/20 hover:bg-background/30 text-primary-foreground"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex gap-2">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-accent"
                      : "w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  }`}
                  aria-label={`Go to scripture ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="h-12 w-12 rounded-full bg-background/20 backdrop-blur-sm border-primary-foreground/20 hover:bg-background/30 text-primary-foreground"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}