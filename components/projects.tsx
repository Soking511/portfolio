"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { ExternalLink, Github, X } from "lucide-react"

type Project = {
  id: number
  title: string
  description: string
  image: string
  longDescription: string
  tags: string[]
  liveLink: string
  githubLink: string
  features: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "TileGreen Web",
    description:
      "Official website for an Egyptian startup transforming plastic waste into sustainable building materials",
    image: "/placeholder.svg?height=600&width=800",
    longDescription:
      "Developed TileGreen's official website, a pioneering Egyptian startup specializing in transforming plastic waste into sustainable, carbon-negative building materials. The site showcases the company's innovative technology that converts non-recyclable plastics into over 40 eco-friendly construction products, including interlocking tiles, bricks, and urban furniture.",
    tags: ["Angular", "Node.js", "Express", "MongoDB", "Responsive Design"],
    liveLink: "https://tilegreen.org/",
    githubLink: "https://github.com/username/tilegreen",
    features: [
      "Responsive design across all devices",
      "Product showcase with detailed information",
      "Company mission and vision presentation",
      "Environmental impact statistics",
      "Contact and inquiry system",
      "Interactive product gallery",
    ],
  },
  {
    id: 2,
    title: "X-Translator App",
    description: "Localization and payment integration platform supporting multiple languages and regions",
    image: "/placeholder.svg?height=600&width=800",
    longDescription:
      "Developed a comprehensive localization platform that supports multiple languages and regions. Integrated Lemon Squeezy for streamlined and secure payment processing, adhering to global standards. Implemented rate-limiting features to protect the application from abuse and maintain high performance under load.",
    tags: ["Angular", "Node.js", "Express", "MongoDB", "Payment Integration"],
    liveLink: "https://xtranslator.app/",
    githubLink: "https://github.com/username/xtranslator",
    features: [
      "Multi-language support",
      "Region-specific content adaptation",
      "Secure payment processing with Lemon Squeezy",
      "Rate-limiting for application protection",
      "User authentication and profiles",
      "Translation management dashboard",
    ],
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with product management, shopping cart, and order processing",
    image: "/placeholder.svg?height=600&width=800",
    longDescription:
      "Developed a full-stack e-commerce platform using Angular for the frontend and Express.js for the backend. The platform includes product management, shopping cart functionality, user authentication, and order processing, providing a seamless and responsive shopping experience for users. Integrated secure payment gateways and built a robust admin dashboard for managing inventory, orders, and user accounts.",
    tags: ["Angular", "Express.js", "Node.js", "MongoDB", "Payment Gateway"],
    liveLink: "https://soking.tech/home",
    githubLink: "https://github.com/username/ecommerce",
    features: [
      "Product management and categorization",
      "Shopping cart functionality",
      "User authentication and profiles",
      "Order processing and tracking",
      "Secure payment gateway integration",
      "Admin dashboard for inventory management",
    ],
  },
  {
    id: 4,
    title: "Contact Management System",
    description: "RESTful API for managing contacts with real-time capabilities and secure data handling",
    image: "/placeholder.svg?height=600&width=800",
    longDescription:
      "Developed a robust RESTful API for managing contacts, featuring real-time capabilities and secure data handling. Implemented JWT-based authentication with secure password hashing using bcrypt. Integrated Socket.IO for real-time updates and notifications. Established a lock management system to prevent concurrent data modifications. Ensured data integrity through comprehensive validation rules. Optimized data retrieval with pagination support. Applied industry best practices for security and error handling.",
    tags: ["Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
    liveLink: "https://project-demo.com",
    githubLink: "https://github.com/username/contact-management",
    features: [
      "JWT-based authentication",
      "Secure password hashing with bcrypt",
      "Real-time updates with Socket.IO",
      "Lock management system",
      "Data validation and integrity",
      "Pagination for optimized data retrieval",
    ],
  },
  {
    id: 5,
    title: "X-Law Legal Management System",
    description: "Platform for lawyers to manage organizations, post legal news, and handle case-related tasks",
    image: "/placeholder.svg?height=600&width=800",
    longDescription:
      "Created a comprehensive platform for lawyers to manage their organizations, post legal news, and handle case-related tasks. The system includes features for employee management and purchase tracking, providing a complete solution for legal practice management.",
    tags: ["Angular", "Django", "PostgreSQL", "REST API", "Legal Tech"],
    liveLink: "https://project-demo.com",
    githubLink: "https://github.com/username/xlaw",
    features: [
      "Organization management for law firms",
      "Legal news posting and management",
      "Case tracking and management",
      "Employee management system",
      "Purchase and expense tracking",
      "Document management and storage",
    ],
  },
  {
    id: 6,
    title: "Supermarket Management System",
    description: "Backend system for managing supermarket operations using Django and Django REST Framework",
    image: "/placeholder.svg?height=600&width=800",
    longDescription:
      "Created a backend system for managing supermarket operations using Django and Django REST Framework (DRF). The system includes comprehensive inventory management, order processing, and user management features, providing a complete solution for supermarket operations.",
    tags: ["Django", "Django REST Framework", "PostgreSQL", "Python", "Backend"],
    liveLink: "https://project-demo.com",
    githubLink: "https://github.com/username/supermarket",
    features: [
      "Inventory management and tracking",
      "Order processing and fulfillment",
      "User management and authentication",
      "Supplier management",
      "Sales reporting and analytics",
      "Product categorization and search",
    ],
  },
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.tags.includes(selectedCategory))
    : projects

  const uniqueTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort()

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
    <section id="projects" className="py-12 sm:py-20 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-8 sm:space-y-12"
        >
          <motion.div variants={item} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
              A showcase of my recent work, demonstrating my skills and expertise in building modern, high-performance
              web applications.
            </p>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 px-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              All
            </Button>
            {uniqueTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedCategory === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(tag)}
                className="rounded-full"
              >
                {tag}
              </Button>
            ))}
          </motion.div>

          <motion.div variants={item} layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full w-full"
    >
      <Card className="overflow-hidden h-full w-full flex flex-col group border border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-background/50 backdrop-blur-sm">
        {/* <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div> */}
        <CardContent className="flex-grow p-6">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="rounded-full">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <div className="flex gap-3 w-full">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="flex-1">
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl">
                <ProjectDetail project={project} />
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="grid md:grid-cols-1 gap-8">
      <div>
        {/* <div className="relative overflow-hidden rounded-lg mb-4">
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-auto object-cover" />
        </div> */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
        {/* <div className="flex space-x-4">
          <Button asChild size="sm">
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <ExternalLink size={16} className="mr-2" /> Live Demo
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Github size={16} className="mr-2" /> View Code
            </a>
          </Button>
        </div> */}
      </div>

      <div>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <p className="text-muted-foreground mb-6">{project.longDescription}</p>
        <div>
          <h3 className="text-lg font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-3 mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
