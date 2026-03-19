"use client"

import { User } from "lucide-react"

export function About() {
  const skills = [
    "Angular",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Localization",
    "Payment Integration",
    "System Optimization",
    "Cloudflare",
    "VPS Administration",
    "DevOps Tooling"
  ]

  const stats = [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Completed", value: "15+" },
  ]

  return (
    <section id="about" className="bg-white py-32 border-y-8 border-dark-grey overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-20 flex flex-col items-start gap-6 relative">
          {/* Decorative background block behind title */}
          <div className="absolute -left-4 -top-4 w-48 h-20 bg-primary border-4 border-dark-grey lg:block hidden"></div>
          
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-dark-grey relative z-10 bg-white border-4 border-dark-grey px-8 py-4 box-shadow-solid flex items-center gap-4">
            <User className="w-12 h-12 md:w-16 md:h-16 text-primary" strokeWidth={3} />
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left side: Bio Content */}
          <div className="lg:col-span-8 flex flex-col bg-flat-grey border-4 border-dark-grey box-shadow-solid p-8 md:p-12 relative group hover:-translate-y-2 hover:translate-x-2 transition-transform duration-300">
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-dark-grey mb-8">
              Full-Stack Developer
            </h3>
            
            <div className="space-y-6 text-lg md:text-xl font-bold leading-relaxed text-dark-grey/90 border-l-4 border-primary pl-6">
              <p>
                I'm a Full-Stack Developer with experience in building powerful, high-performance applications in e-commerce, learning management, and legal systems.
              </p>
              <p>
                I specialize in <span className="text-primary uppercase tracking-widest font-black">Angular</span>, <span className="text-primary uppercase tracking-widest font-black">Node.js</span>, <span className="text-primary uppercase tracking-widest font-black">MongoDB</span>, and <span className="text-primary uppercase tracking-widest font-black">TypeScript</span>, with expertise in complex localization, seamless payment integration, and robust system optimization to deliver seamless user experiences.
              </p>
              <p>
                I work effectively with teams to deliver under tight deadlines without compromising scalability and performance.
              </p>
            </div>
          </div>

          {/* Right side: Skills and Stats */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white border-4 border-dark-grey box-shadow-solid p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:translate-x-1 transition-transform duration-300">
                  <span className="text-4xl xl:text-5xl font-black text-dark-grey mb-2">{stat.value}</span>
                  <span className="text-xs font-black uppercase tracking-widest text-primary leading-tight mt-1">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Core Expertise Tags */}
            <div className="bg-white border-4 border-dark-grey box-shadow-solid p-8">
              <h4 className="text-2xl font-black uppercase tracking-tight text-dark-grey mb-6">Core Skills</h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="text-sm font-black uppercase tracking-widest bg-dark-grey text-white px-4 py-2 border-2 border-dark-grey hover:bg-primary hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
