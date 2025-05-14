"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star } from "lucide-react"

type Testimonial = {
  name: string
  role: string
  company: string
  image: string
  quote: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechStart Inc.",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Youseef delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and problem-solving abilities are truly impressive.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateNow",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Working with Youseef was a pleasure. He transformed our complex requirements into an intuitive and user-friendly application that our customers love.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Founder",
    company: "HealthTech Solutions",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Youseef's expertise in both frontend and backend development was crucial to our project's success. He built a scalable solution that continues to perform flawlessly.",
    rating: 4,
  },
  {
    name: "David Kim",
    role: "Marketing Director",
    company: "Global Reach",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Our website traffic increased by 70% after Youseef optimized our platform for performance and SEO. His technical knowledge combined with business understanding is rare.",
    rating: 5,
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={item} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Feedback</h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
              What clients and collaborators say about working with me and the solutions I've delivered.
            </p>
          </motion.div>

          <motion.div variants={item}>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-md h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center space-x-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}
            />
          ))}
        </div>

        <blockquote className="text-muted-foreground italic mb-6 flex-grow">"{testimonial.quote}"</blockquote>

        <div className="flex items-center mt-auto">
          <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
            <img
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
