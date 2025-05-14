"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Skill = {
  name: string
  type: "frontend" | "backend" | "devops" | "soft"
}

const skills: Skill[] = [
  { name: "Angular", type: "frontend" },
  { name: "React", type: "frontend" },
  { name: "TypeScript", type: "frontend" },
  { name: "HTML/CSS", type: "frontend" },
  { name: "SCSS/Sass", type: "frontend" },
  { name: "Node.js", type: "backend" },
  { name: "Express", type: "backend" },
  { name: "Django", type: "backend" },
  { name: "PostgreSQL", type: "backend" },
  { name: "MongoDB", type: "backend" },
  { name: "C#", type: "backend" },
  { name: "Lua", type: "backend" },
  { name: "Docker", type: "devops" },
  { name: "CI/CD", type: "devops" },
  { name: "Git", type: "devops" },
  { name: "Problem Solving", type: "soft" },
  { name: "Communication", type: "soft" },
  { name: "Team Leadership", type: "soft" },
  { name: "Agile/Scrum", type: "soft" },
]

type Milestone = {
  year: string
  title: string
  description: string
  type: "education" | "work"
}

const milestones: Milestone[] = [
  {
    year: "2025",
    title: "Full Stack Developer",
    description: "The POST - Remote position",
    type: "work",
  },
  {
    year: "2024",
    title: "Freelance Developer",
    description: "Upwork, Fiverr and Khamsat - Building various web applications",
    type: "work",
  },
  {
    year: "2023",
    title: "Full Stack Training",
    description: "NTI - National Telecommunication Institute",
    type: "education",
  },
  {
    year: "2023",
    title: "Summer Training",
    description: "Cairo Higher Institute (CHI) - Full-Stack Development",
    type: "education",
  },
  {
    year: "2023",
    title: "Computer Science Degree",
    description: "Bachelor's degree in Computer Science from Cairo Higher Institute",
    type: "education",
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="about" className="py-20 px-6 relative">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-16"
        >
          <motion.div variants={item} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground leading-relaxed">
              I'm a Full-Stack Developer with experience in building powerful, high-performance applications in
              e-commerce, learning management, and legal systems. I specialize in Angular, Node.js, and Django, with
              expertise in localization, payment integration, and system optimization to deliver seamless user
              experiences. I work effectively with teams to deliver under tight deadlines without compromising
              scalability and performance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div variants={item}>
              <h3 className="text-2xl font-semibold mb-6">My Journey</h3>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-border ml-4">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                    <div className="absolute -left-[25px] top-0 font-mono text-sm text-primary">{milestone.year}</div>
                    <div className="pt-1">
                      <h4 className="text-lg font-medium">{milestone.title}</h4>
                      <p className="text-muted-foreground mt-1">{milestone.description}</p>
                      <Badge variant="outline" className="mt-2">
                        {milestone.type === "education" ? "Education" : "Work Experience"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item}>
              <h3 className="text-2xl font-semibold mb-6">Skills & Expertise</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const colors: Record<string, string> = {
    frontend: "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50",
    backend: "bg-green-500/10 border-green-500/20 hover:border-green-500/50",
    devops: "bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50",
    soft: "bg-orange-500/10 border-orange-500/20 hover:border-orange-500/50",
  }

  return (
    <Card
      className={`group relative overflow-hidden ${colors[skill.type]} border transition-all duration-300 hover:shadow-md`}
    >
      <CardContent className="p-4 flex items-center justify-center">
        <span className="text-sm font-medium group-hover:scale-105 transition-transform">{skill.name}</span>
      </CardContent>
    </Card>
  )
}
