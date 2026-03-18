"use client"

import { Briefcase, GraduationCap, ChevronRight } from "lucide-react"

type ExperienceItem = {
  title: string
  company: string
  location: string
  period: string
  description: string
  technologies: string[]
  type: "work" | "education"
}

const experienceItems: ExperienceItem[] = [
  {
    title: "Full Stack Developer",
    company: "The POST",
    location: "Remote",
    period: "2025 - Present",
    description:
      "Working as a full-stack developer on various projects, utilizing Angular, Node.js, and other technologies to build high-performance web applications.",
    technologies: ["Angular", "Node.js", "Express", "MongoDB", "TypeScript"],
    type: "work",
  },
  {
    title: "Freelance Developer",
    company: "Upwork, Fiverr, Khamsat",
    location: "Remote",
    period: "2024 - 2025",
    description:
      "Contributed to and designed a number of projects that demonstrated skills in Django, Lua, Mean Stack, C#, and other technologies. Worked with clients worldwide to deliver custom web and desktop applications.",
    technologies: ["Angular", "Django", "Node.js", "Lua", "MongoDB"],
    type: "work",
  },
  {
    title: "Full Stack Training",
    company: "NTI (National Telecommunication Institute)",
    location: "Cairo, Egypt",
    period: "2023",
    description:
      "Completed intensive training in full-stack development, focusing on modern web technologies and best practices for building scalable applications.",
    technologies: ["JavaScript", "Node.js", "Angular", "MongoDB", "Express"],
    type: "education",
  },
  {
    title: "Summer Training",
    company: "Cairo Higher Institute (CHI)",
    location: "Cairo, Egypt",
    period: "2023",
    description:
      "Participated in a summer training program focused on full-stack development, gaining hands-on experience with real-world projects and industry practices.",
    technologies: ["Web Development", "Full-Stack", "JavaScript", "Python"],
    type: "education",
  },
  {
    title: "Bachelor of Science in Computer Science",
    company: "Cairo Higher Institute",
    location: "Cairo, Egypt",
    period: "2020 - 2025",
    description:
      "Completed a Bachelor's degree in Computer Science, focusing on software engineering, algorithms, data structures, and web development.",
    technologies: ["Computer Science", "Software Engineering", "Algorithms", "Data Structures"],
    type: "education",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flat-card p-8">
        <h2 className="text-3xl font-black uppercase text-dark-grey mb-12 flex items-center gap-4">
          <Briefcase className="text-primary w-8 h-8" />
          Experience & Education
        </h2>
        
        <div className="space-y-12 pl-4 border-l-4 border-dark-grey ml-2">
          {experienceItems.map((experience, index) => (
            <div key={index} className="relative pl-8 group">
              {/* Timeline dot */}
              <div className="absolute -left-[28px] top-1.5 w-5 h-5 bg-off-white border-4 border-dark-grey rounded-full group-hover:bg-primary transition-colors"></div>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-dark-grey flex items-center gap-2">
                    {experience.type === "work" ? <Briefcase className="w-5 h-5 text-primary" /> : <GraduationCap className="w-5 h-5 text-primary" />}
                    {experience.title}
                  </h3>
                  <div className="text-primary font-bold mt-2 text-sm uppercase tracking-widest">
                    {experience.company} <span className="text-dark-grey/30 px-2">|</span> {experience.location}
                  </div>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest border-2 border-dark-grey px-4 py-2 text-dark-grey self-start bg-flat-grey transition-colors hover:bg-dark-grey hover:text-white">
                  {experience.period}
                </div>
              </div>
              
              <p className="text-dark-grey/80 mt-4 mb-6 max-w-3xl leading-relaxed font-medium">
                {experience.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs font-bold uppercase tracking-widest bg-flat-grey text-dark-grey px-3 py-1 border-2 border-dark-grey hover:text-primary transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
