import React from 'react'

export default function TestimonialSection() {
  return (
   <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Loved by Parish Leaders</h2>
            <p className="text-xl text-gray-600">See what pastors and administrators are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "ParishPro transformed how we manage our parish. What used to take hours now takes minutes. The sacramental tracking alone has saved us countless hours.",
                author: "Fr. Michael O'Brien",
                role: "Pastor, St. Mary's Parish",
              },
              {
                quote:
                  "The family connections feature is incredible. We can now see relationships across generations that were impossible to track with our old filing system.",
                author: "Sister Catherine Rodriguez",
                role: "Parish Administrator, Holy Family Church",
              },
              {
                quote:
                  "Finally, a system built specifically for Catholic parishes. The support team is amazing and truly understands our unique needs!",
                author: "Deacon James Wilson",
                role: "St. Joseph's Cathedral",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="mb-4">
                  <div className="flex space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic leading-relaxed mb-4">"{testimonial.quote}"</p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
