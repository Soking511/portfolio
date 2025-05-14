"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone, MapPin, Linkedin, Loader2, Code } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Script from "next/script"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { initializeApp } from "firebase/app"

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
  const { toast } = useToast()
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
      const { db } = await import('@/lib/firebase')

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

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={item} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
              Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
            </p>
          </motion.div>

          <motion.div variants={item}>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Your Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Project Inquiry"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project..."
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Contact Information</h3>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Email</h4>
                          <a
                            href="mailto:youseeftareq5176@gmail.com"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            youseeftareq5176@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <Phone className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Phone</h4>
                          <a
                            href="tel:+201557337989"
                            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                          >
                            +201557337989
                            <span className="text-xs text-muted-foreground">(WhatsApp available)</span>
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Location</h4>
                          <p className="text-muted-foreground">Cairo, Egypt</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h4 className="font-medium mb-4">Connect</h4>
                      <div className="flex space-x-4">
                        <a
                          href="https://linkedin.com/in/youseef-tareq"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-background/80 hover:bg-primary/10 border border-border hover:border-primary/30 text-foreground hover:text-primary p-2 rounded-full transition-colors"
                          aria-label="LinkedIn Profile"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>                         <a
                          href="https://wa.me/201557337989"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-background/80 hover:bg-primary/10 border border-border hover:border-primary/30 text-foreground hover:text-primary p-2 rounded-full transition-colors"
                          aria-label="WhatsApp Chat"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                            <path d="M9 10a0.5.0.5 0 0 0 1 0V9a0.5.0.5 0 0 0-1 0v1Zm0 0a5 5 0 0 0 5 5h1a0.5.0.5 0 0 0 0-1h-1a4 4 0 0 1-4-4" />
                          </svg>
                        </a>
                        <a
                          href="https://soking.tech"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-background/80 hover:bg-primary/10 border border-border hover:border-primary/30 text-foreground hover:text-primary p-2 rounded-full transition-colors"
                          aria-label="Portfolio Website"
                        >
                          <Code className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">FAQ</h3>

                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
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
