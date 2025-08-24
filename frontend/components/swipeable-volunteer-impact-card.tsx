"use client"

import { useEffect, useRef, useState } from "react"
import { Target, Gift, Award } from "lucide-react"
import { useTranslation } from "react-i18next"

export interface VolunteerImpact {
  hoursThisMonth: number
  hoursGoal: number
  totalHours: number
  rank: number
  rewardsAvailable: number
  nextReward?: string
}

interface Slide {
  id: string
  title: string
  gradient: string
  Icon: React.ComponentType<any>
}

export function SwipeableVolunteerImpactCard({ impact }: { impact: VolunteerImpact }) {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const progressPct = Math.round((impact.hoursThisMonth / impact.hoursGoal) * 100)

  const slides: Slide[] = [
    { id: "impact", title: t('volunteer.impact.title'), gradient: "bg-gradient-to-r from-purple-500 to-purple-600", Icon: Target },
    { id: "rewards", title: t('volunteer.impact.rewards'), gradient: "bg-gradient-to-r from-yellow-400 to-yellow-500", Icon: Gift },
    { id: "rank", title: t('volunteer.impact.thisWeek'), gradient: "bg-gradient-to-r from-blue-500 to-blue-600", Icon: Award },
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
      {/* Indicators */}
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

      {/* Main Card */}
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

          <div className="mt-3 space-y-2">
            {currentSlide.id === 'impact' && (
              <div>
                <div className="text-3xl font-extrabold text-white">{impact.hoursThisMonth}/{impact.hoursGoal} hrs</div>
                <div className="text-sm text-white/90">{t('volunteer.impact.thisMonth', { hours: impact.hoursThisMonth, goal: impact.hoursGoal })} • {progressPct}%</div>
                <div className="mt-2 w-full h-2 bg-white/30 rounded-full">
                  <div className="h-2 bg-white rounded-full" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="mt-2 text-sm text-white/90">{t('volunteer.impact.totalHours')}: <span className="font-semibold text-white">{impact.totalHours}</span></div>
              </div>
            )}

            {currentSlide.id === 'rewards' && (
              <div>
                <div className="text-3xl font-extrabold text-white">{impact.rewardsAvailable}</div>
                <div className="text-sm text-white/90">{t('volunteer.impact.rewards')}</div>
                {impact.nextReward && (
                  <div className="mt-1 text-sm text-white/90">{t('volunteer.impact.nextReward', { defaultValue: 'Next' })}: {impact.nextReward}</div>
                )}
                <button className="mt-3 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl border border-white/30 backdrop-blur-sm">
                  {t('volunteer.impact.redeem')}
                </button>
              </div>
            )}

            {currentSlide.id === 'rank' && (
              <div>
                <div className="text-5xl font-extrabold text-white">#{impact.rank}</div>
                <div className="text-sm text-white/90">{t('volunteer.impact.thisWeek')}</div>
              </div>
            )}
          </div>
        </div>

        {/* Background decoration */}
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


