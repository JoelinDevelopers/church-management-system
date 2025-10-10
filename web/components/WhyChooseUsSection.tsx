import { CheckCircle2 } from 'lucide-react'
import React from 'react'

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Churches Choose ParishPro</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Save 15+ Hours Weekly",
                    description:
                      "Automate administrative tasks and focus on pastoral care instead of paperwork. Our system handles the busywork so you can focus on your ministry.",
                  },
                  {
                    title: "Secure & Compliant",
                    description:
                      "Bank-level encryption with GDPR compliance and regular security audits. Your parish data is protected with enterprise-grade security.",
                  },
                  {
                    title: "Easy Migration",
                    description:
                      "We help you digitize existing records with our dedicated migration team. Seamless transition from paper to digital with full support.",
                  },
                  {
                    title: "24/7 Support",
                    description:
                      "Dedicated support team available whenever you need assistance. We're here to ensure your parish runs smoothly.",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="space-y-6">
                <div className="text-center pb-6 border-b border-blue-200">
                  <div className="text-6xl font-bold text-blue-900 mb-2">1000+</div>
                  <div className="text-gray-700 font-medium">Parishes Worldwide</div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-900 mb-1">500K+</div>
                    <div className="text-sm text-gray-600">Members Managed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-900 mb-1">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-900 mb-1">50+</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-900 mb-1">4.9/5</div>
                    <div className="text-sm text-gray-600">User Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
