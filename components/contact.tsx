"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { SendHorizontal, Loader2, Mail, MapPin, Phone, Facebook, MessageSquare } from "lucide-react"

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
  message: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

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
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all required fields')
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }

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

      setFormData({
        name: "",
        email: "",
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
    <section className="bg-white py-32 border-y-8 border-dark-grey" id="contact">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Big Typography & Info */}
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-dark-grey leading-none">
                Get In <br className="hidden lg:block" /> Touch
              </h2>
              <div className="mt-8 inline-block bg-primary text-white font-black uppercase tracking-widest px-6 py-3 border-4 border-dark-grey box-shadow-solid -rotate-2">
                Let's Collaborate
              </div>
            </div>
            
            <p className="text-xl font-bold text-dark-grey max-w-md bg-flat-grey p-6 border-4 border-dark-grey">
              Have an exciting project you need help with?
              Send me an email or drop a message via the form!
            </p>

            <div className="flex flex-col gap-6 font-black uppercase tracking-widest mt-4">
              <a href="mailto:youseeftareq5176@gmail.com" className="flex items-center gap-4 text-sm md:text-xl hover:text-primary transition-colors group">
                <div className="bg-flat-grey p-4 border-4 border-dark-grey group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail strokeWidth={3} className="w-8 h-8" />
                </div>
                <span className="break-all">youseeftareq5176@gmail.com</span>
              </a>
              <a href="https://wa.me/201557337989" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm md:text-xl hover:text-[#25D366] transition-colors group">
                <div className="bg-flat-grey p-4 border-4 border-dark-grey group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <Phone strokeWidth={3} className="w-8 h-8" />
                </div>
                <span className="break-all">+20 155 733 7989</span>
              </a>
              <a href="https://www.facebook.com/SokingElectron" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm md:text-xl hover:text-[#1877F2] transition-colors group">
                <div className="bg-flat-grey p-4 border-4 border-dark-grey group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
                  <Facebook strokeWidth={3} className="w-8 h-8" />
                </div>
                <span className="break-all">Facebook</span>
              </a>
              <div className="flex items-center gap-4 text-sm md:text-xl hover:text-[#5865F2] transition-colors group">
                <div className="bg-flat-grey p-4 border-4 border-dark-grey group-hover:bg-[#5865F2] group-hover:text-white transition-colors cursor-pointer" onClick={() => { navigator.clipboard.writeText('soking_'); toast({ title: "Copied!", description: "Discord username copied to clipboard." }); }}>
                  <MessageSquare strokeWidth={3} className="w-8 h-8" />
                </div>
                <span className="break-all min-w-[150px]">Discord: soking_</span>
              </div>
              <div className="flex items-center gap-4 text-sm md:text-xl text-dark-grey hidden lg:flex">
                <div className="bg-flat-grey p-4 border-4 border-dark-grey">
                  <MapPin strokeWidth={3} className="w-8 h-8" />
                </div>
                <span>Remote / Worldwide</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-off-white p-6 md:p-12 border-4 border-dark-grey box-shadow-solid relative">
             {/* Decorative element */}
             <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary border-4 border-dark-grey rounded-full hidden md:block"></div>
             
             <form onSubmit={handleSubmit} className="flex flex-col gap-6">
               <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-black uppercase tracking-widest text-dark-grey">Name</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-4 border-dark-grey bg-white p-4 font-bold text-lg md:text-xl focus:border-primary focus:outline-none focus:-translate-y-1 focus:translate-x-1 hover:-translate-y-1 hover:translate-x-1 box-shadow-solid transition-all"
                    placeholder="Your Name"
                    type="text"
                  />
               </div>
               
               <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-black uppercase tracking-widest text-dark-grey">Email</label>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-4 border-dark-grey bg-white p-4 font-bold text-lg md:text-xl focus:border-primary focus:outline-none focus:-translate-y-1 focus:translate-x-1 hover:-translate-y-1 hover:translate-x-1 box-shadow-solid transition-all"
                    placeholder="you@example.com"
                    type="email"
                  />
               </div>
               
               <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-black uppercase tracking-widest text-dark-grey">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[200px] border-4 border-dark-grey bg-white p-4 font-bold text-lg md:text-xl focus:border-primary focus:outline-none focus:-translate-y-1 focus:translate-x-1 hover:-translate-y-1 hover:translate-x-1 box-shadow-solid transition-all resize-none"
                    placeholder="How can I help you?"
                  ></textarea>
               </div>
               
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="mt-6 bg-primary py-6 text-xl font-black uppercase tracking-widest text-white border-4 border-dark-grey box-shadow-solid hover:translate-x-1 hover:-translate-y-1 hover:bg-dark-grey transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:transform-none disabled:hover:bg-primary"
               >
                 {isSubmitting ? (
                   <>
                     <Loader2 className="h-6 w-6 animate-spin" strokeWidth={3} />
                     <span>Sending...</span>
                   </>
                 ) : (
                   <>
                     <span>Send Message</span>
                     <SendHorizontal className="h-6 w-6" strokeWidth={3} />
                   </>
                 )}
               </button>
             </form>
          </div>
        </div>
      </div>
    </section>
  )
}
