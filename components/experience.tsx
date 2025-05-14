"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-b from-muted/30 to-background">
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto"
      >
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
      </motion.div>
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
  const cardRef = useRef(null)
  const isCardInView = useInView(cardRef, { once: true, amount: 0.3 })

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, x: -20 }}
      animate={isCardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative ${!isLast ? "pb-8" : ""}`}
    >
      {!isLast && (
        <div className="absolute top-12 left-11 -ml-px h-full w-0.5 bg-gradient-to-b from-primary/50 via-border to-border" aria-hidden="true" />
      )}

      <div className="relative flex space-x-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-lg ring-1 ring-primary/20">
            {experience.type === "work" ? (
              <motion.div whileHover={{ rotate: 15 }}>
                <Briefcase className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div whileHover={{ rotate: -15 }}>
                <GraduationCap className="h-6 w-6" />
              </motion.div>
            )}
          </span>
        </motion.div>

        <div className="flex-1 min-w-0">
          <Card className="group overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
            <CardContent className="p-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-col md:flex-row md:items-center justify-between mb-2"
              >
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{experience.title}</h3>
                <span className="text-sm text-muted-foreground md:text-right mt-1 md:mt-0">{experience.period}</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={isCardInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-4"
              >
                <p className="font-medium text-primary/80">
                  {experience.company} • {experience.location}
                </p>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={isCardInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-muted-foreground mb-4"
              >
                {experience.description}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex flex-wrap gap-2"
              >
                {experience.technologies.map((tech, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-primary/5 hover:bg-primary/10 transition-colors duration-200"
                  >
                    {tech}
                  </Badge>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
