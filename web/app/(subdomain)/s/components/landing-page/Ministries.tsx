"use client"

import { getMinistriesData } from '@/lib/subdomain-landing';
import { useQuery } from '@tanstack/react-query'
import { Heart, Users, Globe, BookHeart, Handshake, GraduationCap, LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Icon mapping helper
const iconMap: Record<string, LucideIcon> = {
  Heart: Heart,
  Users: Users,
  Globe: Globe,
  BookHeart: BookHeart,
  Handshake: Handshake,
  GraduationCap: GraduationCap,
}

export function Ministries() {
  const { data: ministriesData, isLoading, error } = useQuery({
    queryKey: ["ministriesData"],
    queryFn: getMinistriesData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-muted-foreground">Loading ministries...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-red-600">Error loading ministries: {error.message}</div>
          </div>
        </div>
      </section>
    );
  }

  if (!ministriesData || ministriesData.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Our Ministries</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              No ministries available at this time. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Our Ministries</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Discover the various ways we serve our community and spread God's love through dedicated ministry work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministriesData.map((ministry) => {
            const Icon = iconMap[ministry.icon] || Heart;
            return (
              <Card
                key={ministry.id}
                className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image with overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={ministry.image || "/placeholder.svg"}
                    alt={ministry.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${ministry.color} opacity-60 group-hover:opacity-70 transition-opacity`}
                  />

                  {/* Icon overlay */}
                  <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {ministry.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{ministry.description}</p>

                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  >
                    Get Involved
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <Card className="inline-block bg-primary text-primary-foreground border-0 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-3">Want to Serve?</h3>
              <p className="text-primary-foreground/90 mb-6 max-w-xl">
                Join one of our ministries and make a difference in the lives of others while growing in your faith
              </p>
              <Button size="lg" variant="secondary" className="font-semibold">
                Contact Ministry Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}