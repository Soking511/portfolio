"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
    <section id="about" className="py-20 px-6 relative">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-16"
        >
          <motion.div variants={item} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground leading-relaxed">
              I'm a Full-Stack Developer with experience in building powerful, high-performance applications in
              e-commerce, learning management, and legal systems. I specialize in Angular, Node.js, and Django, with
              expertise in localization, payment integration, and system optimization to deliver seamless user
              experiences. I work effectively with teams to deliver under tight deadlines without compromising
              scalability and performance.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
