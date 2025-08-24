"use client"

import { useEffect, useRef, useState } from "react"
import { BarChart3, TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"
import { LineChart, Line, ResponsiveContainer } from "recharts"

type RadarPoint = {
  current: { x: number; y: number }
  goal: { x: number; y: number }
  grid: { x: number; y: number }
  label: { x: number; y: number }
  skill: { name: string; progress: number; Goal: number }
  angle: number
  index: number
}

export function SwipeableProgressCharts() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Charts data
  const skills = [
    { name: "alphabet", progress: 85, Goal: 80 },
    { name: "sightWords", progress: 60, Goal: 75 },
    { name: "vocabulary", progress: 72, Goal: 70 },
    { name: "phonemicAwareness", progress: 79, Goal: 75 },
    { name: "pointAndRead", progress: 91, Goal: 85 },
  ]

  const progressData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 68 },
    { month: "Mar", score: 71 },
    { month: "Apr", score: 74 },
    { month: "May", score: 76 },
    { month: "Jun", score: 80 },
  ]

  // Radar calculations (Apple-style minimal)
  const calculateRadarPoints = (): RadarPoint[] => {
    const centerX = 180
    const centerY = 170
    const maxRadius = 70

    return skills.map((skill, index) => {
      const angle = (index * 72 - 90) * (Math.PI / 180)
      const currentRadius = (skill.progress / 100) * maxRadius
      const goalRadius = (skill.Goal / 100) * maxRadius

      const currentX = centerX + currentRadius * Math.cos(angle)
      const currentY = centerY + currentRadius * Math.sin(angle)
      const goalX = centerX + goalRadius * Math.cos(angle)
      const goalY = centerY + goalRadius * Math.sin(angle)

      const gridX = centerX + maxRadius * Math.cos(angle)
      const gridY = centerY + maxRadius * Math.sin(angle)

      const labelRadius = maxRadius + 55
      const labelX = centerX + labelRadius * Math.cos(angle)
      const labelY = centerY + labelRadius * Math.sin(angle)

      return {
        current: { x: currentX, y: currentY },
        goal: { x: goalX, y: goalY },
        grid: { x: gridX, y: gridY },
        label: { x: labelX, y: labelY },
        skill,
        angle: angle * (180 / Math.PI),
        index,
      }
    })
  }

  const radarPoints = calculateRadarPoints()
  const currentPathData = radarPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.current.x} ${point.current.y}`)
    .join(" ") + " Z"

  const goalPathData = radarPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.goal.x} ${point.goal.y}`)
    .join(" ") + " Z"

  // Swipe logic
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
    if (isLeftSwipe) setCurrentIndex((prev) => (prev + 1) % 2)
    else if (isRightSwipe) setCurrentIndex((prev) => (prev - 1 + 2) % 2)
  }

  useEffect(() => {
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % 2), 5000)
    return () => clearInterval(interval)
  }, [])

  // Slides config (green gradients only per theme)
  const slides = [
    {
      id: "skills",
      title: t("progress.radar.title"),
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
      Icon: BarChart3,
      render: () => (
        <div className="flex justify-center w-full">
          <svg width="100%" height="200" viewBox="-20 35 360 200" className="max-w-sm mx-auto">
            <defs>
              <filter id="chartShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
                <feOffset dx="0" dy="1" result="offset" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.08" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid pentagons */}
            <polygon points="180,100 235,135 215,205 145,205 125,135" fill="none" stroke="#f8fafc" strokeWidth="1" opacity="0.6" />
            <polygon points="180,117 218,143 206,188 154,188 142,143" fill="none" stroke="#f8fafc" strokeWidth="1" opacity="0.4" />
            <polygon points="180,135 201,152 196,170 164,170 159,152" fill="none" stroke="#f8fafc" strokeWidth="1" opacity="0.3" />

            {/* Axis lines */}
            {radarPoints.map((point, index) => (
              <line key={`axis-${index}`} x1="180" y1="170" x2={point.grid.x} y2={point.grid.y} stroke="#f8fafc" strokeWidth="1" opacity="0.4" />
            ))}

            {/* Goal level (dashed) */}
            <path d={goalPathData} fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.5" />

            {/* Current polygon (white) */}
            <path d={currentPathData} fill="rgba(255, 255, 255, 0.15)" stroke="#ffffff" strokeWidth="2.5" filter="url(#chartShadow)" />

            {/* Data points */}
            {radarPoints.map((point, index) => (
              <circle key={`point-${index}`} cx={point.current.x} cy={point.current.y} r="3.5" fill="#ffffff" stroke="#ffffff" strokeWidth="2" filter="url(#chartShadow)" />
            ))}

            {/* Skill labels and percents */}
            {radarPoints.map((point, index) => {
              const getShortLabel = (key: string) => {
                switch (key) {
                  case 'sightWords':
                    return 'Sight'
                  case 'phonemicAwareness':
                    return 'Phonemic'
                  case 'vocabulary':
                    return 'Vocab'
                  default:
                    return t(`progress.skills.${key}.name`, { defaultValue: key })
                }
              }
              const labelPositions = [
                { x: 180, y: 70, anchor: "middle", percentY: 88 },
                { x: 260, y: 125, anchor: "start", percentY: 145 },
                { x: 260, y: 215, anchor: "start", percentY: 230 },
                { x: 100, y: 215, anchor: "end", percentY: 230 },
                { x: 100, y: 125, anchor: "end", percentY: 145 },
              ]
              const pos = labelPositions[index]
              return (
                <g key={`label-${index}`}>
                  <text x={pos.x} y={pos.y} textAnchor={pos.anchor} className="fill-white/90 select-none" style={{ fontSize: '14px', fontWeight: '800' }}>
                    {getShortLabel(point.skill.name)}
                  </text>
                  <text x={pos.x} y={pos.percentY} textAnchor={pos.anchor} className="fill-white select-none" style={{ fontSize: '13px', fontWeight: '900' }}>
                    {point.skill.progress}%
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      ),
    },
    {
      id: "trend",
      title: t("progress.trend.title"),
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      Icon: TrendingUp,
      render: () => (
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              {/* No axes/ticks/labels to keep card minimal */}
              <Line type="monotone" dataKey="score" stroke="#ffffff" strokeWidth={3} dot={{ fill: "#ffffff", r: 5 }} activeDot={{ r: 7, fill: "#ffffff" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ),
    },
  ]

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
        className={`${currentSlide.gradient} rounded-3xl px-5 pt-3 pb-5 relative overflow-hidden transition-all duration-500 ease-in-out transform`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-white/90 font-medium">
                    {currentSlide.title}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-0">
            {currentSlide.render()}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute bottom-4 right-6 opacity-20">
          {currentSlide.id === 'trend' ? (
            <div className="text-white text-5xl font-extrabold leading-none">90%</div>
          ) : (
            <IconComponent className="w-16 h-16 text-white" />
          )}
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 right-4 w-24 h-24 border border-white rotate-45"></div>
          <div className="absolute bottom-8 left-4 w-16 h-16 border border-white rounded-full"></div>
        </div>
      </div>
    </div>
  )
}


