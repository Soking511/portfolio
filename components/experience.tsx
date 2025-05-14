"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap } from "lucide-react"

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
      "Contributed to and designed a number of projects that demonstrated skills in Django, Lua, Mean Stack, C#, and other technologies. Worked with clients worldwide to deliver custom web an  Lua, Mean Stack, C#, and other technologies. Worked with clients worldwide to deliver custom web and desktop applications.",
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

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
    <section id="experience" className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={item} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Education</h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
              My professional journey and educational background in the field of software development and web
              technologies.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-8">
            {experienceItems.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} isLast={index === experienceItems.length - 1} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ExperienceCard({
  experience,
  isLast,
}: {
  experience: ExperienceItem
  isLast: boolean
}) {
  return (
    <div className={`relative ${!isLast ? "pb-8" : ""}`}>
      {!isLast && <span className="absolute top-12 left-11 -ml-px h-full w-0.5 bg-border" aria-hidden="true" />}

      <div className="relative flex space-x-4">
        <div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {experience.type === "work" ? <Briefcase className="h-6 w-6" /> : <GraduationCap className="h-6 w-6" />}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <Card className="overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{experience.title}</h3>
                <span className="text-sm text-muted-foreground md:text-right mt-1 md:mt-0">{experience.period}</span>
              </div>

              <div className="mb-4">
                <p className="font-medium">
                  {experience.company} • {experience.location}
                </p>
              </div>

              <p className="text-muted-foreground mb-4">{experience.description}</p>

              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
