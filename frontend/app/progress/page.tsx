 "use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Edit3, Volume2, TrendingUp, Smile } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useFontSize } from "@/app/font-size-provider"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"
import { SwipeableProgressCharts } from "@/components/swipeable-progress-charts"
import { PreviousAssignmentCard } from "@/components/previous-assignment-card"

// Skills data with progress and insights
const skillsDataRaw = [
  {
    name: "alphabet",
    progress: 85,
    insight: "Fantastic progress! Ready for extra practice with letter pairs like b/d.",
    icon: Edit3,
    Goal: 80,
    teacherComment: "Great improvement on lowercase shapes. Keep spacing consistent between letters.",
  },
  {
    name: "sightWords", 
    progress: 60,
    insight: "Great foundation! On track",
    icon: BookOpen,
    Goal: 75,
    teacherComment: "Practice high-frequency words daily. Try flashcards during reading time.",
  },
  {
    name: "vocabulary",
    progress: 72,
    insight: "Wonderful word collection! Ahead of schedule and ready for new challenges.",
    icon: BookOpen,
    Goal: 70,
    teacherComment: "Introduce new words in conversation and ask for examples in sentences.",
  },
  {
    name: "phonemicAwareness",
    progress: 79,
    insight: "Excellent listening skills! Blending sounds beautifully every day.",
    icon: Volume2,
    Goal: 75,
    teacherComment: "Keep practicing sound blending with simple CVC words (e.g., cat, map).",
  },
  {
    name: "pointAndRead",
    progress: 91,
    insight: "Amazing confidence! Reading independently like a champion.",
    icon: BookOpen,
    Goal: 85,
    teacherComment: "Encourage finger-tracking for tricky lines to maintain steady pace.",
  },
]

// Sort skills by priority (weakest first, considering Goal benchmark)
const skillsData = skillsDataRaw
  .map(skill => ({
    ...skill,
    priority: skill.progress - skill.Goal, // Negative = needs attention
    status: skill.progress < skill.Goal ? 'needs-focus' : 'good'
  }))
  .sort((a, b) => a.priority - b.priority)

// Progress timeline data
const progressData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 71 },
  { month: "Apr", score: 74 },
  { month: "May", score: 76 },
  { month: "Jun", score: 80 },
]

export default function ProgressPage() {
  const { t } = useTranslation()
  const { isLarge } = useFontSize()
  // Calculate radar chart points for pentagon (Apple iOS style - mobile optimized)
  const calculateRadarPoints = () => {
    const centerX = 180
    const centerY = 170
    const maxRadius = 70
    
    const skills = [
      { name: "alphabet", progress: 85, Goal: 80 },
      { name: "sightWords", progress: 60, Goal: 75 },
      { name: "vocabulary", progress: 72, Goal: 70 },
      { name: "phonemicAwareness", progress: 79, Goal: 75 },
      { name: "pointAndRead", progress: 91, Goal: 85 },
    ]
    
    
    return skills.map((skill, index) => {
      const angle = (index * 72 - 90) * (Math.PI / 180) // Pentagon angles (starting from top)
      const currentRadius = (skill.progress / 100) * maxRadius
      const GoalRadius = (skill.Goal / 100) * maxRadius
      
      // Data points
      const currentX = centerX + currentRadius * Math.cos(angle)
      const currentY = centerY + currentRadius * Math.sin(angle)
      const GoalX = centerX + GoalRadius * Math.cos(angle)
      const GoalY = centerY + GoalRadius * Math.sin(angle)
      
      // Grid line endpoints
      const gridX = centerX + maxRadius * Math.cos(angle)
      const gridY = centerY + maxRadius * Math.sin(angle)
      
      // Label positions with generous spacing for mobile
      const labelRadius = maxRadius + 55
      const labelX = centerX + labelRadius * Math.cos(angle)
      const labelY = centerY + labelRadius * Math.sin(angle)
      
      return { 
        current: { x: currentX, y: currentY }, 
        Goal: { x: GoalX, y: GoalY },
        grid: { x: gridX, y: gridY },
        label: { x: labelX, y: labelY },
        skill,
        angle: angle * (180 / Math.PI),
        index
      }
    })
  }

  const radarPoints = calculateRadarPoints()
  const currentPathData = radarPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.current.x} ${point.current.y}`
  ).join(' ') + ' Z'
  
  const GoalPathData = radarPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.Goal.x} ${point.Goal.y}`
  ).join(' ') + ' Z'

  const overallScore = progressData[progressData.length - 1]?.score ?? 0

  return (
    <div className={`min-h-screen bg-gray-50 ${isLarge ? 'min-text-lg text-lg' : ''}`}>
      <div className="max-w-md mx-auto px-6 py-10 space-y-8">
        {/* Swipeable charts: skills and trend */}
        <SwipeableProgressCharts />

        {/* Skills Breakdown */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 text-left">{t('progress.skills.title')}</h2>
          <div className="space-y-3">
            {skillsData.map((skill, index) => {
              const isNeedsFocus = skill.status === 'needs-focus'
              const priorityBadge = index === 0 && isNeedsFocus ? t('progress.skills.focusFirst') : null

              // Get subject color based on skill name
              const getSubjectColor = (name: string) => {
                switch (name) {
                  case 'alphabet':
                    return 'bg-orange-500';
                  case 'sightWords':
                    return 'bg-blue-500';
                  case 'vocabulary':
                    return 'bg-purple-500';
                  case 'phonemicAwareness':
                    return 'bg-green-500';
                  case 'pointAndRead':
                    return 'bg-red-500';
                  default:
                    return 'bg-gray-500';
                }
              };

              return (
                <PreviousAssignmentCard
                  key={skill.name}
                  title={t(`progress.skills.${skill.name}.name`, { defaultValue: skill.name })}
                  subtitle=""
                  subject={t(`progress.skills.${skill.name}.name`, { defaultValue: skill.name })}
                  subjectColor={getSubjectColor(skill.name)}
                  rightContent={
                    <>
                      {/* Focus first badge */}
                      {priorityBadge && (
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 border-orange-200"
                        >
                          {priorityBadge}
                        </Badge>
                      )}
                      {/* Progress percentage */}
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isNeedsFocus ? 'text-orange-600 bg-orange-50' : 'text-green-600 bg-green-50'
                      }`}>
                        {skill.progress}/100
                      </div>
                    </>
                  }
                >
                  {/* Plain left-aligned text */}
                  <p className="text-sm text-gray-700">{t(`progress.skills.${skill.name}.insight`, { defaultValue: skill.insight })}</p>
                </PreviousAssignmentCard>
              )
            })}
          </div>
        </div>

        {/* (AI Personalized Practices removed from Progress page) */}

        {/* Trend is included inside SwipeableProgressCharts above */}

        {/* Bottom padding for navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  )
}