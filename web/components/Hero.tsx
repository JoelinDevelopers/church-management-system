"use client"

import React, { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Church,
    Database,
    Shield,
    Calendar,
    Users,
    CheckCircle2,
    Phone,
    Mail,
    MapPin,
    BookOpen,
    TrendingUp,
} from "lucide-react"
import { CommandSelect } from "@/components/ui/command-select"
import { cn } from "@/lib/utils"
import { useCountryData } from "@/hooks/use-countries"
import { formSchema, roles, type FormData } from "@/lib/form-schema"
import { Button } from "@/components/ui/button"
import { WhatsAppBubble } from "@/components/whatsapp-bubble"
import FeatureSection from "./FeatureSection"
import ContactSection from "./ContactSection"
import WhyChooseUsSection from "./WhyChooseUsSection"
import TestimonialSection from "./TestimonialSection"
import SystemRequestForm from "./SystemRequestForm"


export default function ParishLandingPage() {
    const { countries, loading: countriesLoading, error: countriesError } = useCountryData()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    })

    const watchedCountry = watch("country")
    const watchedState = watch("state")
    const watchedRole = watch("role")

    const countryOptions = useMemo(() => {
        return countries.map((country) => ({
            name: country.name,
            value: country.name,
        }))
    }, [countries])

    const stateOptions = useMemo(() => {
        if (!watchedCountry) return []

        const selectedCountry = countries.find((country) => country.name === watchedCountry)
        if (!selectedCountry) return []

        return selectedCountry.states.map((state) => ({
            name: state,
            value: state,
        }))
    }, [countries, watchedCountry])

    React.useEffect(() => {
        if (watchedCountry && watchedState) {
            const selectedCountry = countries.find((country) => country.name === watchedCountry)
            if (selectedCountry && !selectedCountry.states.includes(watchedState)) {
                setValue("state", "", { shouldValidate: true })
            }
        }
    }, [watchedCountry, watchedState, countries, setValue])

    const onSubmit = async (data: FormData) => {
        try {
            console.log("[v0] Form data:", data)

            alert("Thank you for your request! We will contact you within 24 hours to set up your parish management system.")
            reset()
        } catch (error) {
            console.error("[v0] Error submitting form:", error)
            alert("There was an error submitting your request. Please try again.")
        }
    }

    if (countriesError) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Page</h2>
                    <p className="text-gray-600 mb-4">
                        We're having trouble loading the countries data. Please check your connection and try again.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-primary hover:bg-primary text-white px-6 py-2 rounded-lg"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-primary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <div className="space-y-6">

                            <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-balance">
                                Streamline Your Parish Management
                            </h1>

                            <p className="text-xl text-blue-100 leading-relaxed text-pretty">
                                Join 1000+ Catholic parishes worldwide using our comprehensive management system to organize records,
                                track sacraments, and strengthen community connections.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {[
                                    { icon: Database, label: "Digital Parish Records" },
                                    { icon: Shield, label: "Custom Domain & Login" },
                                    { icon: Calendar, label: "Sacramental Tracking" },
                                    { icon: Users, label: "Family Connections" },
                                ].map((feature) => (
                                    <div key={feature.label} className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                            <feature.icon className="w-5 h-5 text-blue-200" />
                                        </div>
                                        <span className="text-sm font-medium">{feature.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <div className="bg-blue-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-700/30">
                                    <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        Transform Your Parish Today
                                    </h4>
                                    <p className="text-sm text-blue-100 leading-relaxed">
                                        Say goodbye to scattered filing cabinets and handwritten ledgers. Our system digitizes everything,
                                        making parish administration efficient and accessible.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form Card */}
                        <SystemRequestForm />
                    </div>
                </div>
            </section>

            <FeatureSection />

            <WhyChooseUsSection />

            <TestimonialSection />

            <ContactSection />

            <WhatsAppBubble
                phoneNumber="+1234567890"
                message="Hello! I'm interested in the Parish Management System. Can you help me get started?"
            />
        </div>
    )
}
