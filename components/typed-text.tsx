"use client"

import { useEffect, useRef, useState } from "react"

interface TypedTextProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetween?: number
}

export function TypedText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 2000,
}: TypedTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const currentText = texts[currentIndex]

    if (isDeleting) {      if (displayText === "") {
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        const nextText = texts[(currentIndex + 1) % texts.length]
        timeoutRef.current = setTimeout(() => {
          setDisplayText(nextText.charAt(0))
        }, delayBetween)
      } else {
        timeoutRef.current = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1))
        }, deletingSpeed)
      }
    } else {
      if (displayText === currentText) {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true)
        }, delayBetween)
      } else {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, typingSpeed)
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [displayText, currentIndex, isDeleting, texts, typingSpeed, deletingSpeed, delayBetween])

  return (
    <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
      <span className="text-muted-foreground">I build </span>
      <span className="relative">
        <span className="text-foreground">{displayText}</span>
        <span className="absolute -right-1 top-0 h-full w-[2px] bg-primary animate-blink" />
      </span>
    </h2>
  )
}
