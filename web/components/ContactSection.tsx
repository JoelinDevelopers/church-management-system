import { Phone, Mail, MapPin } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"

export default function ContactSection() {
  return (
   <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">
              Have questions? Our team is here to help you transform your parish management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Phone Support</h3>
              <p className="text-gray-600 mb-4">Call us during business hours</p>
              <div className="space-y-1">
                <p className="text-blue-600 font-semibold text-lg">+1 (555) 123-4567</p>
                <p className="text-blue-600 font-semibold text-lg">+1 (555) 987-6543</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9AM-6PM EST</p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us your questions anytime</p>
              <p className="text-green-600 font-semibold text-lg">support@parishpro.com</p>
              <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Location</h3>
              <p className="text-gray-600 mb-4">Visit our headquarters</p>
              <div className="text-purple-600 font-semibold">
                <p>123 Church Street</p>
                <p>Vatican City, VC 00120</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Need Immediate Assistance?</h3>
              <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
                Our technical support team is available 24/7 for urgent parish needs. We're committed to ensuring your
                parish management runs smoothly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">Start Live Chat</Button>
                <Button
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-lg bg-transparent"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
