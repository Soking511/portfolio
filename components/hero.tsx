"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Terminal } from "lucide-react"

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const bentoItem = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring", bounce: 0.4 } },
  }

  return (
    <section className="relative min-h-screen border-b-8 border-dark-grey bg-flat-grey pt-32 pb-24 overflow-hidden flex items-center">
      {/* Decorative neo-brutalist background dots */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#80808033_2px,transparent_2px)] bg-[size:32px_32px] pointer-events-none"></div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-7xl mx-auto px-6 z-10"
      >
        
        {/* Big Name Plate (Spans full width on large screens) */}
        <motion.div 
          variants={bentoItem}
          className="md:col-span-3 lg:col-span-4 bg-white border-4 border-dark-grey p-8 md:p-12 box-shadow-solid flex flex-col justify-end min-h-[300px] md:min-h-[400px] relative overflow-hidden group"
        >
          {/* Subtle background decoration */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
          
          <div className="relative z-10 w-full mb-8 lg:mb-0 pt-4">
            <span className="inline-block bg-primary px-4 py-2 text-sm md:text-md font-black uppercase tracking-[0.2em] text-white border-2 border-dark-grey w-max mb-8 lg:mb-12 box-shadow-solid flex items-center gap-2 -rotate-1">
              <Terminal size={18} strokeWidth={3} /> Full-Stack Developer
            </span>
            <div className="flex flex-col tracking-tighter w-full">
              <span className="text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-black uppercase leading-[0.85] text-dark-grey drop-shadow-[5px_5px_0px_#FF6B6B] hover:translate-x-4 transition-transform duration-300">
                Youseef
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-6 lg:mt-8 pb-4">
                {"TAREQ".split("").map((letter, i) => {
                  const isEven = i % 2 === 0;
                  const rotation = i === 2 ? '-rotate-6' : isEven ? 'rotate-3' : '-rotate-3';
                  const bgColor = isEven ? 'bg-primary text-white' : 'bg-dark-grey text-white';
                  
                  return (
                    <span 
                      key={i} 
                      className={`${bgColor} border-4 border-dark-grey w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 lg:w-32 lg:h-36 xl:w-40 xl:h-48 flex items-center justify-center box-shadow-solid ${rotation} hover:rotate-0 hover:-translate-y-4 hover:translate-x-2 transition-all duration-300 text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[9rem] font-black uppercase`}
                    >
                      {letter}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio Box */}
        <motion.div 
          variants={bentoItem}
          className="md:col-span-2 bg-white border-4 border-dark-grey p-8 md:p-10 box-shadow-solid flex items-center group cursor-default"
        >
          <p className="text-xl md:text-2xl font-bold leading-relaxed text-dark-grey border-l-8 border-primary pl-6 py-2 group-hover:border-dark-grey transition-colors">
            Crafting high-performance digital experiences with precision, logic, and a solid technical foundation.
          </p>
        </motion.div>

        {/* View Projects Button Array */}
        <Link href="#projects" passHref legacyBehavior>
          <motion.a 
            variants={bentoItem}
            className="bg-white border-4 border-dark-grey p-8 box-shadow-solid flex flex-col items-center justify-center hover:-translate-y-2 hover:translate-x-2 transition-transform duration-300 group"
          >
             <h3 className="text-2xl font-black uppercase tracking-widest text-dark-grey mb-6 text-center leading-tight">View<br/>Projects</h3>
             <div className="w-16 h-16 bg-primary border-4 border-dark-grey rounded-full flex items-center justify-center group-hover:bg-dark-grey transition-colors box-shadow-solid">
                <ArrowRight className="text-white w-8 h-8 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
             </div>
          </motion.a>
        </Link>
        
        {/* Let's Talk Button Array */}
        <Link href="#contact" passHref legacyBehavior>
          <motion.a 
            variants={bentoItem}
            className="bg-dark-grey border-4 border-dark-grey p-8 box-shadow-solid flex flex-col items-center justify-center hover:-translate-y-2 hover:translate-x-2 transition-transform duration-300 group"
          >
             <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-6 text-center leading-tight">Let's<br/>Talk</h3>
             <div className="w-16 h-16 bg-white border-4 border-dark-grey flex items-center justify-center group-hover:bg-primary transition-colors box-shadow-solid">
                <ArrowRight className="text-dark-grey w-8 h-8 group-hover:text-white group-hover:translate-x-1 transition-all" strokeWidth={3} />
             </div>
          </motion.a>
        </Link>

      </motion.div>
    </section>
  )
}
