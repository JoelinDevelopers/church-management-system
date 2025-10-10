import { BookOpen, Calendar, Database, Shield, TrendingUp, Users } from 'lucide-react'
import React from 'react'

export default function FeatureSection() {
  return (
    <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Everything Your Parish Needs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for Catholic parish administration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Digital Record Management",
                description:
                  "Transform scattered filing cabinets into organized digital records. Search and retrieve member information instantly with our comprehensive database system.",
              },
              {
                icon: Calendar,
                title: "Sacramental Tracking",
                description:
                  "Keep detailed records of baptisms, confirmations, marriages, and other sacraments with automated certificate generation and historical tracking.",
              },
              {
                icon: Users,
                title: "Family Connections",
                description:
                  "Map family relationships across generations. Track connections that were previously impossible to maintain with traditional record-keeping.",
              },
              {
                icon: Shield,
                title: "Custom Domain & Login",
                description:
                  "Branded portal with secure authentication for your parish staff and members. Bank-level encryption ensures data privacy and security.",
              },
              {
                icon: BookOpen,
                title: "Mass Intentions",
                description:
                  "Manage mass intentions, scheduling, and donor tracking in one centralized location. Never lose track of commitments again.",
              },
              {
                icon: TrendingUp,
                title: "Analytics & Reports",
                description:
                  "Generate insights on parish growth, sacraments, and engagement metrics. Make data-driven decisions for your community.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
