import React, { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CommandSelect } from "@/components/ui/command-select"
import { cn } from "@/lib/utils"
import { useCountryData } from "@/hooks/use-countries"
import { formSchema, roles, type FormData } from "@/lib/form-schema"

export default function SystemRequestForm() {
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-2xl w-full overflow-hidden">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Parish Access</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-900">Country *</label>
              <CommandSelect
                options={countryOptions}
                value={watchedCountry || ""}
                onValueChange={(value) => setValue("country", value, { shouldValidate: true })}
                placeholder="Select your country"
                searchPlaceholder="Search countries..."
                error={!!errors.country}
                loading={countriesLoading}
                disabled={countriesLoading}
              />
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-900">State/Province *</label>
              <CommandSelect
                options={stateOptions}
                value={watchedState || ""}
                onValueChange={(value) => setValue("state", value, { shouldValidate: true })}
                placeholder={watchedCountry ? "Select state/province" : "Select country first"}
                searchPlaceholder="Search states/provinces..."
                error={!!errors.state}
                disabled={!watchedCountry || countriesLoading}
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-900">Parish Name *</label>
            <input
              {...register("parishName")}
              type="text"
              placeholder="e.g., St. Mary's Catholic Church"
              className={cn(
                "w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors",
                errors.parishName ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500",
              )}
            />
            {errors.parishName && <p className="text-red-500 text-xs mt-1">{errors.parishName.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-900">Your Full Name *</label>
            <input
              {...register("fullName")}
              type="text"
              placeholder="Enter your full name"
              className={cn(
                "w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors",
                errors.fullName ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500",
              )}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-900">Your Role at the Church *</label>
            <CommandSelect
              options={roles}
              value={watchedRole || ""}
              onValueChange={(value) => setValue("role", value, { shouldValidate: true })}
              placeholder="Select your role"
              searchPlaceholder="Search roles..."
              error={!!errors.role}
              openUpwards={true}
            />
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-900">Email Address *</label>
              <input
                {...register("email")}
                type="email"
                placeholder="your.email@parish.org"
                className={cn(
                  "w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors",
                  errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500",
                )}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-900">WhatsApp Number *</label>
              <input
                {...register("whatsapp")}
                type="tel"
                placeholder="+1 234 567 8900"
                className={cn(
                  "w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors",
                  errors.whatsapp ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500",
                )}
              />
              {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || countriesLoading}
            className={cn(
              "w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 mt-6",
              isSubmitting || countriesLoading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5",
            )}
          >
            {isSubmitting ? "Submitting..." : "Request Access"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            This request is protected by our{" "}
            <button type="button" className="text-blue-600 hover:underline">
              Privacy Policy
            </button>{" "}
            &{" "}
            <button type="button" className="text-blue-600 hover:underline">
              Terms of Service
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
