"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone, MapPin, Linkedin, Loader2, Code, ExternalLink, SendHorizontal, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Script from "next/script"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import type { Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDLfqvbq4LvJZ52M7X9L9vp0bK9fM1aGwo",
  authDomain: "portfolio-6040a.firebaseapp.com",
  projectId: "portfolio-6040a",
  storageBucket: "portfolio-6040a.firebasestorage.app",
  messagingSenderId: "554381798763",
  appId: "1:554381798763:web:87ef0076e2addfec2f302e",
  measurementId: "G-YZFLN1KTGX",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

type FaqItem = {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "I offer full-stack web development services including frontend and backend development, responsive design, API development, database design, and more. I specialize in Angular, React, Node.js, and Django, but can adapt to various tech stacks based on project requirements.",
  },
  {
    question: "How do you handle project pricing?",
    answer:
      "Project pricing depends on the scope, complexity, and timeline. I offer flexible engagement models including fixed price for well-defined projects, hourly rates for ongoing work, and retainer arrangements for long-term collaboration. Contact me with your requirements for a custom quote.",
  },
  {
    question: "What is your development process?",
    answer:
      "My development process typically includes discovery and requirements gathering, planning and architecture, development sprints with regular checkpoints, testing and quality assurance, deployment, and post-launch support. I maintain clear communication throughout the process and adapt to your preferred project management approach.",
  },
  {
    question: "Do you provide ongoing maintenance?",
    answer:
      "Yes, I offer ongoing maintenance and support services to ensure your application remains secure, performant, and up-to-date. This can include bug fixes, feature updates, security patches, and performance optimizations.",
  },
]

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const { toast } = useToast()
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all required fields')
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

      const { collection, addDoc } = await import('firebase/firestore')
      const { db } = await import('@/lib/firebase') as { db: Firestore }

      // Save message to Firestore
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: new Date().toISOString(),
        status: "unread",
        emailNotified: false
      })

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName)
  }

  const handleBlur = () => {
    setActiveField(null)
  }

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 overflow-hidden bg-dot-pattern">
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-10"
        >
          <motion.div variants={item} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
              Contact Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Let's Work Together
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can help your business grow.
            </p>
          </motion.div>

          <motion.div variants={item}>
            <div className="grid lg:grid-cols-[1fr,0.8fr] gap-6 lg:gap-8">
              {/* Contact Form Card */}
              <Card className="group overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:border-border/60 transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Name Field */}
                      <div className="space-y-2.5">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name<span className="text-destructive ml-1">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          className={`transition-all duration-200 ${
                            activeField === 'name' ? 'border-primary/50 ring-1 ring-primary/20' : ''
                          }`}
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2.5">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email<span className="text-destructive ml-1">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          className={`transition-all duration-200 ${
                            activeField === 'email' ? 'border-primary/50 ring-1 ring-primary/20' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="space-y-2.5">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={handleBlur}
                        className={`transition-all duration-200 ${
                          activeField === 'subject' ? 'border-primary/50 ring-1 ring-primary/20' : ''
                        }`}
                      />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2.5">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message<span className="text-destructive ml-1">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project..."
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        className={`transition-all duration-200 resize-none ${
                          activeField === 'message' ? 'border-primary/50 ring-1 ring-primary/20' : ''
                        }`}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 text-base transition-transform active:scale-[0.98]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <SendHorizontal className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Info Cards */}
              <div className="space-y-6">
                {/* Contact Info Card */}
                <Card className="overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                    <div className="space-y-5">
                      {/* Contact Methods */}
                      <a
                        href="mailto:youseeftareq5176@gmail.com"
                        className="flex items-center gap-3.5 group/item text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <span className="p-2 rounded-lg bg-primary/5 text-primary group-hover/item:bg-primary/10 transition-colors duration-200">
                          <Mail className="h-4 w-4" />
                        </span>
                        <span>youseeftareq5176@gmail.com</span>
                      </a>

                      <a
                        href="tel:+201557337989"
                        className="flex items-center gap-3.5 group/item text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <span className="p-2 rounded-lg bg-primary/5 text-primary group-hover/item:bg-primary/10 transition-colors duration-200">
                          <Phone className="h-4 w-4" />
                        </span>
                        <div className="flex items-center gap-2">
                          <span>+201557337989</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">Available</span>
                        </div>
                      </a>

                      <div className="flex items-center gap-3.5 text-muted-foreground">
                        <span className="p-2 rounded-lg bg-primary/5 text-primary">
                          <MapPin className="h-4 w-4" />
                        </span>
                        <span>Cairo, Egypt</span>
                      </div>

                      {/* Social Links */}
                      <div className="pt-5 border-t border-border/60">
                        <div className="flex gap-3">
                          <a
                            href="https://linkedin.com/in/youseef-tareq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg bg-background hover:bg-primary/5 text-muted-foreground hover:text-primary border border-border/60 hover:border-primary/20 transition-colors duration-200"
                            aria-label="Visit LinkedIn Profile"
                            title="Visit LinkedIn Profile"
                          >
                            <Linkedin className="h-4 w-4" aria-hidden="true" />
                          </a>
                          <a
                            href="https://wa.me/201557337989"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg bg-background hover:bg-primary/5 text-muted-foreground hover:text-primary border border-border/60 hover:border-primary/20 transition-colors duration-200"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                              <path d="M9 10a0.5.0.5 0 0 0 1 0V9a0.5.0.5 0 0 0-1 0v1Zm0 0a5 5 0 0 0 5 5h1a0.5.0.5 0 0 0 0-1h-1a4 4 0 0 1-4-4" />
                            </svg>
                          </a>
                          <a
                            href="https://soking.tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg bg-background hover:bg-primary/5 text-muted-foreground hover:text-primary border border-border/60 hover:border-primary/20 transition-colors duration-200"
                          >
                            <Code className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Card */}
                <Card className="overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl font-semibold mb-6">FAQs</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left hover:text-primary transition-colors duration-200">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Structured data for FAQ */}
      <Script id="faq-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              ${faqs
                .map(
                  (faq) => `{
                "@type": "Question",
                "name": "${faq.question}",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "${faq.answer}"
                }
              }`,
                )
                .join(",")}
            ]
          }
        `}
      </Script>
    </section>
  )
}
