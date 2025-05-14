"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[999]"
        style={{ scaleX, transformOrigin: "0%" }}
      />
    </>
  )
}
