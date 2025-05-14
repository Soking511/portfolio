"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TechItem = {
  name: string
  icon: string
  experience: number
  category: "frontend" | "backend" | "devops" | "tools"
}

const techStack: TechItem[] = [
  { name: "Angular", icon: "🅰️", experience: 3, category: "frontend" },
  // { name: "React", icon: "⚛️", experience: 2, category: "frontend" },
  { name: "TypeScript", icon: "TS", experience: 3, category: "frontend" },
  { name: "JavaScript", icon: "JS", experience: 3, category: "frontend" },
  { name: "HTML5", icon: "🌐", experience: 3, category: "frontend" },
  { name: "Tailwind", icon: "🎨", experience: 3, category: "frontend" },
  { name: "Node.js", icon: "🟢", experience: 3, category: "backend" },
  { name: "Express", icon: "🚂", experience: 3, category: "backend" },
  { name: "Django", icon: "🐍", experience: 1, category: "backend" },
  { name: "MongoDB", icon: "🍃", experience: 3, category: "backend" },
  { name: "Lua", icon: "🌙", experience: 4, category: "backend" },
  { name: "Docker", icon: "🐳", experience: 2, category: "devops" },
  { name: "Git", icon: "🔄", experience: 3, category: "devops" },
  { name: "RESTful APIs", icon: "🔌", experience: 3, category: "tools" },
  { name: "JWT", icon: "🔑", experience: 2, category: "tools" },
  { name: "Socket.IO", icon: "🔄", experience: 0.5, category: "tools" },
  { name: "Payment Integration", icon: "💳", experience: 0.5, category: "tools" },
  { name: "Localization", icon: "🌍", experience: 2, category: "tools" },
]

export function TechStack() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-7xl mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl opacity-70 pointer-events-none" />

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-12 relative"
        >
          <motion.div variants={item} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
              The technologies I use to bring ideas to life, from front-end interfaces to back-end systems and
              deployment pipelines.
            </p>
          </motion.div>

          <motion.div variants={item}>
            <Tabs defaultValue="frontend" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="frontend">Frontend</TabsTrigger>
                  <TabsTrigger value="backend">Backend</TabsTrigger>
                  <TabsTrigger value="devops">DevOps</TabsTrigger>
                  <TabsTrigger value="tools">Tools</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="frontend">
                <TechGrid items={techStack.filter((item) => item.category === "frontend")} />
              </TabsContent>

              <TabsContent value="backend">
                <TechGrid items={techStack.filter((item) => item.category === "backend")} />
              </TabsContent>

              <TabsContent value="devops">
                <TechGrid items={techStack.filter((item) => item.category === "devops")} />
              </TabsContent>

              <TabsContent value="tools">
                <TechGrid items={techStack.filter((item) => item.category === "tools")} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function TechGrid({ items }: { items: TechItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <TechCard key={index} item={item} index={index} />
      ))}
    </div>
  )
}

function TechCard({ item, index }: { item: TechItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      <Card className="overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary text-xl font-bold">
              <span>{item.icon}</span>
            </div>
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <div className="mt-1 flex items-center">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(item.experience / 5) * 100}%` }}
                  />
                </div>
                <span className="ml-2 text-xs text-muted-foreground">{item.experience} yrs</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
