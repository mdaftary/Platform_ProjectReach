"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Gift, ArrowRight } from "lucide-react"

interface Slide {
  id: string
  title: string
  value?: string | number
  gradient: string
  Icon: React.ComponentType<any>
  action?: { label: string; onClick?: () => void }
}

export function SwipeablePointsCard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const slides: Slide[] = [
    {
      id: "points",
      title: "Current Points",
      value: 1250,
      gradient: "bg-gradient-to-r from-yellow-400 to-yellow-500",
      Icon: Star,
    },
    {
      id: "redeem",
      title: "Redeem Rewards",
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
      Icon: Gift,
      action: { label: "View Rewards" },
    },
  ]

  const minSwipeDistance = 50
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) setCurrentIndex((prev) => (prev + 1) % slides.length)
    else if (isRightSwipe) setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % slides.length), 5000)
    return () => clearInterval(interval)
  }, [])

  const currentSlide = slides[currentIndex]
  const IconComponent = currentSlide.Icon

  return (
    <div className="relative">
      <div className="flex justify-center mb-2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gray-600 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div
        ref={cardRef}
        className={`${currentSlide.gradient} rounded-3xl p-5 relative overflow-hidden transition-all duration-500 ease-in-out`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div className="text-white/90 font-medium">{currentSlide.title}</div>
          </div>

          <div className="mt-3">
            {currentSlide.id === 'points' && (
              <div className="text-4xl font-extrabold text-white drop-shadow-sm">{currentSlide.value}</div>
            )}
            {currentSlide.id === 'redeem' && (
              <button className="mt-2 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl border border-white/30 backdrop-blur-sm">
                <ArrowRight className="w-4 h-4" />
                {currentSlide.action?.label}
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-4 right-6 opacity-20">
          <IconComponent className="w-16 h-16 text-white" />
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 right-4 w-24 h-24 border border-white rotate-45"></div>
          <div className="absolute bottom-8 left-4 w-16 h-16 border border-white rounded-full"></div>
        </div>
      </div>
    </div>
  )
}


