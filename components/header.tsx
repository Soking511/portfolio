"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "stack", "contact"]
      let currentSection = ""
      
      const scrollPosition = window.scrollY + 100 // Offset for fixed header

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section
            break
          }
        }
      }
      
      setActiveSection(currentSection)
    }

    // Run once to set initial state
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Stack", href: "#stack" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full bg-white transition-all">
      {/* Top Border for neo-brutalism frame */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12 relative z-50 bg-white border-b-4 border-dark-grey">
        <Link href="#" onClick={() => window.scrollTo(0,0)} className="flex items-center group cursor-pointer hover:-translate-y-1 transition-transform">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-dark-grey px-2 py-1">Youseef Tareq</h2>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1)
            return (
              <Link 
                key={link.name}
                href={link.href}
                className={`text-sm font-black uppercase tracking-widest px-4 py-2 border-2 transition-all ${
                  isActive 
                    ? "bg-primary text-white border-dark-grey shadow-[4px_4px_0px_0px_#333333] -translate-y-[2px] translate-x-[2px]" 
                    : "bg-transparent text-dark-grey border-transparent hover:border-dark-grey hover:bg-flat-grey hover:shadow-[4px_4px_0px_0px_#333333] hover:-translate-y-1 hover:translate-x-1"
                }`}
              >
                {link.name}
              </Link>
            )
          })}
          <a 
            href="/[Full-Stack]Youseef%20Tareq.pdf" 
            download 
            className="ml-4 no-round border-2 border-dark-grey bg-primary px-6 py-2 text-sm font-black uppercase tracking-widest text-white hover:bg-dark-grey hover:-translate-y-1 hover:translate-x-1 transition-all box-shadow-solid"
          >
            Resume
          </a>
        </nav>
        
        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            className="p-2 border-2 border-dark-grey bg-flat-grey hover:bg-primary hover:text-white transition-colors box-shadow-solid"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X strokeWidth={3} className="w-6 h-6" /> : <Menu strokeWidth={3} className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white shadow-2xl relative z-40"
          >
            {/* Inner container to hold padding so animation is smooth */}
            <div className="p-6 pb-8 border-b-4 border-dark-grey flex flex-col gap-4 bg-off-white">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1)
                return (
                  <Link 
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-black uppercase tracking-widest p-4 border-2 transition-all ${
                      isActive 
                        ? "bg-primary text-white border-dark-grey shadow-[4px_4px_0px_0px_#333333]" 
                        : "bg-white text-dark-grey border-dark-grey hover:bg-dark-grey hover:text-white hover:shadow-[4px_4px_0px_0px_#333333]"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
              <a 
                href="/[Full-Stack]Youseef%20Tareq.pdf" 
                download 
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 text-center border-2 border-dark-grey bg-dark-grey px-6 py-4 text-lg font-black uppercase tracking-widest text-white hover:bg-primary transition-all box-shadow-solid"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
