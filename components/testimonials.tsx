"use client"

import { ChevronRight, Star, TerminalSquare } from "lucide-react"

type Testimonial = {
  name: string
  role: string
  company: string
  quote: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechStart Inc.",
    quote:
      "Youseef delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and problem-solving abilities are truly impressive.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateNow",
    quote:
      "Working with Youseef was a pleasure. He transformed our complex requirements into an intuitive and user-friendly application that our customers love.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Founder",
    company: "HealthTech Solutions",
    quote:
      "Youseef's expertise in both frontend and backend development was crucial to our project's success. He built a scalable solution that continues to perform flawlessly.",
    rating: 4,
  },
  {
    name: "David Kim",
    role: "Marketing Director",
    company: "Global Reach",
    quote:
      "Our website traffic increased by 70% after Youseef optimized our platform for performance and SEO. His technical knowledge combined with business understanding is rare.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="terminal-window p-8">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-dark-grey">
          <ChevronRight className="text-primary w-8 h-8" />
          ./testimonials.sh --read-all
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="border border-dark-grey/20 p-6 flex flex-col h-full bg-flat-grey/10 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < testimonial.rating ? "text-primary fill-primary" : "text-dark-grey/20"}
                  />
                ))}
              </div>

              <blockquote className="text-dark-grey/80 font-mono text-sm mb-6 flex-grow border-l-2 border-primary/40 pl-4">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center mt-auto pt-4 border-t border-dark-grey/10">
                <TerminalSquare className="w-8 h-8 text-primary/50 mr-3" />
                <div>
                  <h4 className="font-bold text-dark-grey">{testimonial.name}</h4>
                  <p className="text-xs font-mono text-dark-grey/60">
                    user.role = "{testimonial.role}"<br/>
                    user.company = "{testimonial.company}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
