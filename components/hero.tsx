"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Linkedin, Code, ArrowDown } from "lucide-react"
import { TypedText } from "./typed-text"

export function Hero() {
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return

      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      backgroundRef.current.style.transform = `translate(${x * 25}px, ${y * 25}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative flex items-center justify-center min-h-[85vh] sm:min-h-screen overflow-hidden px-3 sm:px-4 py-8 sm:py-0 bg-dot-pattern">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Primary gradient background */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 opacity-50 sm:opacity-100"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.4) 0%, transparent 70%),
              radial-gradient(circle at 80% 20%, rgba(255, 123, 137, 0.4) 0%, transparent 70%),
              radial-gradient(circle at 50% 50%, rgba(62, 210, 248, 0.2) 0%, transparent 70%)
            `,
            backgroundSize: "200% 200%",
            filter: "blur(60px)",
            transform: "translate(0, 0)",
            transition: "transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(90deg, currentColor 1px, transparent 1px),
                           linear-gradient(0deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { width: 300, height: 300, top: "20%", left: "70%", animX: 30, animY: 40, duration: 15 },
          { width: 200, height: 200, top: "60%", left: "20%", animX: -20, animY: 30, duration: 12 },
          { width: 250, height: 250, top: "40%", left: "40%", animX: 25, animY: -35, duration: 18 },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/5 backdrop-blur-3xl rounded-full"
            style={{
              width: shape.width,
              height: shape.height,
              top: shape.top,
              left: shape.left,
              opacity: 0.5,
            }}
            animate={{
              y: [0, shape.animY],
              x: [0, shape.animX],
              scale: [1, 1.2],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl px-3 sm:px-8 py-8 sm:py-16 mx-auto">
        <div className="grid lg:grid-cols-[1.5fr,1fr] gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex justify-center lg:justify-start"
              >
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs sm:text-sm font-medium backdrop-blur-sm">
                  Available for freelance work
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/50 tracking-tight"
              >
                Youseef Tareq
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="max-w-[90vw] sm:max-w-full mx-auto lg:mx-0"
              >
                <TypedText
                  texts={[
                    "stunning web applications",
                    "scalable backend systems",
                    "beautiful user interfaces",
                    "high-performance APIs",
                    "robust full-stack solutions",
                  ]}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Results-driven full-stack developer with expertise in Angular, Node.js, and Django. Building powerful,
                high-performance applications for e-commerce, learning management, and legal systems.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="group rounded-full w-full sm:w-auto">
                <Link href="#projects">
                  Explore Projects
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group rounded-full w-full sm:w-auto">
                <a href="/[MEAN%20Stack]%20Youseef%20Tareq.pdf" download="Youseef_Tareq_CV.pdf">
                  Download Resume
                  <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" size={16} />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="pt-2 sm:pt-4"
            >
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 text-center lg:text-left">Tech Stack</p>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                {["Angular", "Node.js", "Django", "React", "TypeScript"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium border border-border/40 bg-background/50 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>


        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs sm:text-sm text-muted-foreground">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} className="text-muted-foreground hidden sm:block" />
          <ArrowDown size={16} className="text-muted-foreground sm:hidden" />
        </motion.div>
      </motion.div>
    </section>
  )
}
