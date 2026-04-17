"use client"

import { useState, useCallback, useEffect, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PresentationEngineProps {
  children: ReactNode[]
  totalSlides: number
  onSlideChange?: (index: number) => void
}

export function PresentationEngine({ children, totalSlides, onSlideChange }: PresentationEngineProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides && !isTransitioning) {
        setIsTransitioning(true)
        setCurrentSlide(index)
        onSlideChange?.(index)
        setTimeout(() => setIsTransitioning(false), 400)
      }
    },
    [totalSlides, isTransitioning]
  )

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      {/* Slide content */}
      <div className="relative w-full h-full">
        {children.map((child, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-all duration-500 ease-out"
            style={{
              opacity: currentSlide === index ? 1 : 0,
              transform: currentSlide === index ? "scale(1)" : "scale(0.98)",
              pointerEvents: currentSlide === index ? "auto" : "none",
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-8 z-50">
        {/* Progress bar */}
        <div className="flex items-center gap-4 flex-1">
          <div className="flex gap-1.5">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "w-8 bg-primary"
                    : i < currentSlide
                      ? "w-3 bg-primary/40"
                      : "w-3 bg-muted-foreground/20"
                }`}
                aria-label={`${i + 1}번 슬라이드로 이동`}
              />
            ))}
          </div>
        </div>

        {/* Slide number */}
        <span className="text-muted-foreground text-sm font-mono tabular-nums">
          {String(currentSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </span>

        {/* Arrow buttons */}
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-lg bg-secondary/50 text-foreground disabled:opacity-20 hover:bg-secondary transition-colors"
            aria-label="이전 슬라이드"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="p-2 rounded-lg bg-secondary/50 text-foreground disabled:opacity-20 hover:bg-secondary transition-colors"
            aria-label="다음 슬라이드"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
