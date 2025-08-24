"use client"

import { useState, useRef, useEffect } from "react"
import { Star, Clock, BookOpen } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ProgressStat {
  id: string
  title: string
  value: string | number
  subtitle: string
  icon: React.ComponentType<any>
  gradient: string
}

export function SwipeableProgressCard() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Define the three stats with different gradients
  const stats: ProgressStat[] = [
    {
      id: "stars",
      title: t('progress.stats.totalPoints'),
      value: 847,
      subtitle: t('progress.stats.starsEarnedThisMonth'),
      icon: Star,
      gradient: "bg-gradient-to-r from-yellow-300 to-yellow-400"
    },
    {
      id: "hoursTotal",
      title: t('progress.stats.totalHours'),
      value: "124.5",
      subtitle: t('progress.stats.hoursLearnedOverall'),
      icon: BookOpen,
      gradient: "bg-gradient-to-r from-blue-400 to-blue-500"
    },
    {
      id: "hoursWeek",
      title: t('progress.stats.hoursThisWeek'),
      value: "8.2",
      subtitle: t('progress.stats.hoursLearnedThisWeek'),
      icon: Clock,
      gradient: "bg-gradient-to-r from-green-400 to-green-500"
    }
  ]

  const currentStat = stats[currentIndex]
  const IconComponent = currentStat.icon

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // Clear any previous touch end position
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      // Swipe left - go to next
      setCurrentIndex((prev) => (prev + 1) % stats.length)
    } else if (isRightSwipe) {
      // Swipe right - go to previous
      setCurrentIndex((prev) => (prev - 1 + stats.length) % stats.length)
    }
  }

  // Auto-advance every 5 seconds if no interaction
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stats.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + stats.length) % stats.length)
      } else if (event.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % stats.length)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative">
    {/* Progress Indicators */}
    <div className="flex justify-center mb-4 gap-2">
      {stats.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentIndex 
              ? 'bg-gray-600 w-6' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to stat ${index + 1}`}
        />
      ))}
    </div>
      {/* Main Card */}
      <div
        ref={cardRef}
        className={`${currentStat.gradient} rounded-3xl p-6 relative overflow-hidden transition-all duration-500 ease-in-out transform`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }} // Allow vertical scrolling but handle horizontal swipes
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white drop-shadow-sm">
                    {currentStat.value}
                  </div>
                  <div className="text-sm text-white/90 font-medium">
                    {currentStat.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute bottom-4 right-6 opacity-20">
          <IconComponent className="w-16 h-16 text-white" />
        </div>

        {/* Geometric background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 right-4 w-24 h-24 border border-white rotate-45"></div>
          <div className="absolute bottom-8 left-4 w-16 h-16 border border-white rounded-full"></div>
        </div>
      </div>

    </div>
  )
}
