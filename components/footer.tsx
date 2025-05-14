"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Linkedin, ArrowUp, Code } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-muted/30 border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
              YT
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Full-Stack Developer specializing in Angular, Node.js, and Django with a focus on building
              high-performance, accessible web applications for e-commerce, learning management, and legal systems.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-muted-foreground hover:text-primary transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/in/youseef-tareq"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://soking.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Portfolio Website"
              >
                <Code size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Youseef Tareq. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="mt-4 sm:mt-0 p-2 rounded-full bg-muted hover:bg-muted-foreground/10 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
