"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b-2 border-dark-grey bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-xl font-black uppercase tracking-tighter text-dark-grey">Youseef Tareq</h2>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <Link className="text-sm font-bold uppercase tracking-widest text-dark-grey hover:text-primary transition-colors" href="#about">About</Link>
          <Link className="text-sm font-bold uppercase tracking-widest text-dark-grey hover:text-primary transition-colors" href="#projects">Projects</Link>
          <Link className="text-sm font-bold uppercase tracking-widest text-dark-grey hover:text-primary transition-colors" href="#stack">Stack</Link>
          <Link className="text-sm font-bold uppercase tracking-widest text-dark-grey hover:text-primary transition-colors" href="#contact">Contact</Link>
          <a href="/[Full-Stack]Youseef%20Tareq.pdf" download className="no-round border-2 border-dark-grey bg-primary px-6 py-2 text-sm font-bold uppercase text-white hover:bg-dark-grey transition-all">
              Resume
          </a>
        </nav>
        <div className="md:hidden">
          <span 
            className="material-symbols-outlined text-dark-grey cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="bg-white border-b-2 border-dark-grey p-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link className="text-sm font-bold uppercase tracking-widest text-dark-grey hover:text-primary transition-colors" href="#about" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link className="text-sm font-bold uppercase tracking-widest text-dark-grey hover:text-primary transition-colors" href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
              <Link className="text-sm font-bold uppercase tracking-widest text-dark-grey hover:text-primary transition-colors" href="#stack" onClick={() => setMobileMenuOpen(false)}>Stack</Link>
              <Link className="text-sm font-bold uppercase tracking-widest text-dark-grey hover:text-primary transition-colors" href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <a href="/[Full-Stack]Youseef%20Tareq.pdf" download className="no-round border-2 border-dark-grey bg-primary px-6 py-2 text-sm font-bold uppercase text-white hover:bg-dark-grey transition-all text-center">
                  Resume
              </a>
            </nav>
        </div>
      )}
    </header>
  )
}
