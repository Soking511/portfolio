"use client"

import Link from "next/link"
import { Linkedin, ArrowUp, Code, Github } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="border-t-8 border-dark-grey mt-20 bg-primary text-dark-grey overflow-hidden relative">
      <div className="absolute top-0 w-full h-4 bg-dark-grey"></div>
      
      {/* Huge typographic banner */}
      <div className="border-b-8 border-dark-grey bg-flat-grey py-12 px-6 flex justify-center">
        <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter text-dark-grey text-center leading-none">
          Let's Build <br className="hidden md:block" /> Something <br className="hidden md:block" /> Epic
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 text-3xl font-black uppercase bg-white border-4 border-dark-grey px-6 py-3 box-shadow-solid hover:translate-x-1 hover:-translate-y-1 transition-transform">
              <Code className="w-8 h-8 text-primary" strokeWidth={3} />
              Youseef<span className="text-primary">.dev</span>
            </Link>
            <p className="text-xl font-bold max-w-md mt-6 bg-white/90 p-6 border-4 border-dark-grey">
              Full-Stack Developer specializing in Angular, Node.js, and Django with a focus on building high-performance web applications.
            </p>
          </div>

          <div className="bg-white border-4 border-dark-grey p-8 box-shadow-solid">
            <h3 className="text-2xl font-black uppercase tracking-widest text-dark-grey mb-6 border-b-4 border-dark-grey pb-4">Sitemap</h3>
            <ul className="space-y-4 font-black uppercase tracking-widest text-lg">
              <li>
                <Link href="#about" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-4 h-1 bg-primary transition-all"></span> About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-4 h-1 bg-primary transition-all"></span> Projects
                </Link>
              </li>
              <li>
                <Link href="#stack" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-4 h-1 bg-primary transition-all"></span> Skills
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-4 h-1 bg-primary transition-all"></span> Experience
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-white border-4 border-dark-grey p-8 box-shadow-solid">
            <h3 className="text-2xl font-black uppercase tracking-widest text-dark-grey mb-6 border-b-4 border-dark-grey pb-4">Socials</h3>
            <div className="flex flex-col space-y-4 font-black uppercase tracking-widest text-lg">
              <a
                href="https://linkedin.com/in/youseef-tareq"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-3 bg-flat-grey border-2 border-dark-grey p-3 hover:bg-dark-grey hover:text-white"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} strokeWidth={2.5} /> LinkedIn
              </a>
              <a
                href="https://soking.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-3 bg-flat-grey border-2 border-dark-grey p-3 hover:bg-dark-grey hover:text-white"
                aria-label="Portfolio Website"
              >
                <Github size={24} strokeWidth={2.5} /> GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-8 border-dark-grey pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-lg md:text-xl font-black uppercase tracking-widest bg-white border-4 border-dark-grey px-6 py-3 text-center w-full md:w-auto">
            &copy; {new Date().getFullYear()} Youseef Tareq. <br className="md:hidden" /> All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="w-full md:w-auto p-4 md:px-8 font-black text-white bg-dark-grey border-4 border-white hover:bg-white hover:border-dark-grey hover:text-dark-grey box-shadow-solid transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-lg"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} strokeWidth={3} /> Back to Top
          </button>
        </div>
      </div>
    </footer>
  )
}
