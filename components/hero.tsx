"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Linkedin, Code, ArrowDown } from "lucide-react"

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
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 10%, rgba(255, 123, 137, 0.4) 0%, transparent 50%)`,
          backgroundSize: "200% 200%",
          filter: "blur(80px)",
          transform: "translate(0, 0)",
          transition: "transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      />

      {/* Frosted Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl px-6 py-12 mx-4 rounded-2xl overflow-hidden bg-background/30 backdrop-blur-xl border border-border/40 shadow-2xl"
      >
        <div className="flex justify-center items-center">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm font-medium text-primary"
            >
              Hello, I&apos;m
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mt-2"
            >
              Youseef Tareq
            </motion.h1>

            <TypedText
              texts={[
                "Full-Stack Developer",
                "Angular Expert",
                "Node.js Engineer",
                "Django Developer",
                "UI/UX Enthusiast",
              ]}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-5 text-muted-foreground max-w-md"
            >
              Results-driven full-stack developer proficient in Angular, Node.js, and Django, with experience in
              building powerful, high-performance applications in e-commerce, learning management, and legal systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Button asChild size="lg" className="group">
                <Link href="#projects">
                  Explore Projects
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/resume.pdf" download>
                  Download Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex items-center gap-6 mt-8"
            >
              <a
                href="https://linkedin.com/in/youseef-tareq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              {/* <a
                href="https://soking.tech/portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Portfolio"
              >
                <Code size={20} />
              </a> */}
            </motion.div>
          </div>


        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            <Link href="#about" aria-label="Scroll to About section">
              <ArrowDown className="text-primary h-8 w-8" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function TypedText({ texts }: { texts: string[] }) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="text-xl md:text-2xl font-medium mt-2 text-primary min-h-[2rem]"
    >
      <TypedTextAnimation texts={texts} />
    </motion.h3>
  )
}

function TypedTextAnimation({ texts }: { texts: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let currentIndex = 0
    let currentText = ""
    let isDeleting = false
    let typingSpeed = 100

    const type = () => {
      const fullText = texts[currentIndex]

      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1)
      } else {
        currentText = fullText.substring(0, currentText.length + 1)
      }

      if (containerRef.current) {
        containerRef.current.textContent = currentText
      }

      if (!isDeleting && currentText === fullText) {
        typingSpeed = 2000 // Pause at the end of a word
        isDeleting = true
      } else if (isDeleting && currentText === "") {
        isDeleting = false
        currentIndex = (currentIndex + 1) % texts.length
        typingSpeed = 500 // Pause before typing next word
      } else {
        typingSpeed = isDeleting ? 50 : 100
      }

      setTimeout(type, typingSpeed)
    }

    setTimeout(type, 1000)

    // Cleanup function not strictly necessary here since this
    // only runs once and persists for component lifetime
  }, [texts])

  return <div ref={containerRef}></div>
}
