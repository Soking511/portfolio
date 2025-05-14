"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { ArrowRight, Linkedin, Github, Download, Sparkles } from "lucide-react"
import { TypedText } from "./typed-text"

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateX = (e.clientY - centerY) / 30
    const rotateY = (centerX - e.clientX) / 30
    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 })

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      style={{ perspective: 1000 }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.95])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      backgroundRef.current.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.section
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ y, opacity, scale }}
    >
      {/* Modern gradient background with noise texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_#1a1b1e_0%,_transparent_50%),radial-gradient(circle_at_100%_0%,_#2a1f3f_0%,_transparent_50%),radial-gradient(circle_at_100%_100%,_#1f2937_0%,_transparent_50%),radial-gradient(circle_at_0%_100%,_#312e81_0%,_transparent_50%)] opacity-40" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '8rem 8rem',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        }}
      />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10 backdrop-blur-3xl"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3,
            }}
            animate={{
              y: [0, Math.random() * 50 - 25],
              x: [0, Math.random() * 50 - 25],
              scale: [1, Math.random() * 0.2 + 0.9],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container px-4 py-20">
        <div className="grid lg:grid-cols-[1.5fr,1fr] gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TiltCard>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Available for Projects
                  </span>
                </div>
              </TiltCard>
            </motion.div>

            {/* Name and role */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight"
              >
                <span className="inline-block bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  Youseef Tareq
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <TypedText
                  texts={[

                    "MEAN Stack SaaS",
                    "DevOps & Deployment",
                    "Cloudflare & CDN Optimizer",
                    "High Performance Solutions",
                  ]}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0"
              >
                Crafting exceptional digital experiences with modern technologies.
                Specializing in scalable web applications and elegant user interfaces.
              </motion.p>
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="group rounded-xl px-6 h-12 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity"
              >
                <Link href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group rounded-xl px-6 h-12 hover:bg-primary/5"
              >
                <a href="/Youseef_Tareq_CV.pdf" download>
                  <Download className="mr-2 w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  Download CV
                </a>
              </Button>
            </motion.div>

            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="pt-6"
            >
              <p className="text-sm text-muted-foreground mb-3 text-center lg:text-left">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {["Angular", "Node.js", "Django", "React", "TypeScript"].map((tech) => (
                  <TiltCard key={tech}>
                    <div className="px-4 py-1.5 rounded-lg text-sm font-medium border border-border/40 bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 transition-colors">
                      {tech}
                    </div>
                  </TiltCard>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 3D Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative aspect-square w-full max-w-md mx-auto hidden lg:block"
          >

          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
