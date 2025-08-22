"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Edit3, Volume2, TrendingUp, Play } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useFontSize } from "@/app/font-size-provider"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"

// Skills data with progress and insights
const skillsDataRaw = [
  {
    name: "alphabet",
    progress: 85,
    insight: "Fantastic progress! Ready for extra practice with letter pairs like b/d.",
    icon: Edit3,
    Goal: 80,
  },
  {
    name: "sightWords", 
    progress: 60,
    insight: "Great foundation! On track, just 15% more to go for the next milestone.",
    icon: BookOpen,
    Goal: 75,
  },
  {
    name: "vocabulary",
    progress: 72,
    insight: "Wonderful word collection! Ahead of schedule and ready for new challenges.",
    icon: BookOpen,
    Goal: 70,
  },
  {
    name: "phonemicAwareness",
    progress: 79,
    insight: "Excellent listening skills! Blending sounds beautifully every day.",
    icon: Volume2,
    Goal: 75,
  },
  {
    name: "pointAndRead",
    progress: 91,
    insight: "Amazing confidence! Reading independently like a champion.",
    icon: BookOpen,
    Goal: 85,
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

// AI Recommendations grouped by skill
const aiRecommendations = [
  {
    skill: "sightWords",
    skillProgress: 60,
    title: "Practice Sight Words",
    description: "Play \"find the word\" game in today's storybook.",
    timeNeeded: "5 min",
    icon: BookOpen,
    priority: "high"
  },
  {
    skill: "alphabet", 
    skillProgress: 85,
    title: "Letter Practice",
    description: "Trace lowercase letters \"b\" and \"d\" for clarity.",
    timeNeeded: "5 min",
    icon: Edit3,
    priority: "medium"
  },
  {
    skill: "phonemicAwareness",
    skillProgress: 79, 
    title: "Sound Matching",
    description: "Try sound-blending exercise in the student app.",
    timeNeeded: "10 min",
    icon: Volume2,
    priority: "low"
  },
]

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
      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className={`${isLarge ? 'text-2xl' : 'text-lg'} font-bold text-gray-900 tracking-tight`}>{t('progress.header.title')}</h1>
          <p className={`${isLarge ? 'text-base' : 'text-sm'} text-gray-500`}>{t('progress.header.subtitle')}</p>
        </div>
        {/* Overall Score */}
        <div className="duolingo-gradient-light rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full duolingo-gradient-primary flex items-center justify-center shadow">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-2xl font-extrabold text-gray-900 tabular-nums">{overallScore}</div>
              <div className="text-xs text-gray-700 mt-0.5">{t('progress.header.overallScore')}</div>
            </div>
          </div>
        </div>


        {/* Five-Dimension Radar Chart */}
        {!isLarge && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
        <div className="space-y-6">
              <h2 className={`${isLarge ? 'text-2xl' : 'text-lg'} font-semibold text-gray-900 text-center`}>{t('progress.radar.title')}</h2>
              
              <div className="flex justify-center w-full">
                <svg width="100%" height="280" viewBox="0 0 360 280" className="max-w-sm mx-auto">
                  {/* Definitions for Apple-style effects */}
                  <defs>
                    <filter id="chartShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
                      <feOffset dx="0" dy="1" result="offset"/>
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.08"/>
                      </feComponentTransfer>
                      <feMerge> 
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/> 
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Minimal grid pentagons (Apple Health style) */}
                  {/* Outer pentagon (100%) */}
              <polygon
                    points="180,100 235,135 215,205 145,205 125,135"
                fill="none"
                    stroke="#f8fafc"
                strokeWidth="1"
                    opacity="0.6"
              />
                  
                  {/* Middle pentagon (75%) */}
              <polygon
                    points="180,117 218,143 206,188 154,188 142,143"
                fill="none"
                    stroke="#f8fafc"
                strokeWidth="1"
                    opacity="0.4"
              />
                  
                  {/* Inner pentagon (50%) */}
              <polygon
                    points="180,135 201,152 196,170 164,170 159,152"
                fill="none"
                    stroke="#f8fafc"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  
                  {/* Axis lines (ultra minimal) */}
                  {radarPoints.map((point, index) => (
                    <line
                      key={`axis-${index}`}
                      x1="180"
                      y1="170"
                      x2={point.grid.x}
                      y2={point.grid.y}
                      stroke="#f8fafc"
                strokeWidth="1"
                      opacity="0.4"
                    />
                  ))}
                  
                  {/* Goal level (benchmark) - Apple gray dashed */}
                  <path
                    d={GoalPathData}
                    fill="none"
                    stroke="#d1d5db"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                    opacity="0.6"
                  />
                  
                  {/* Current progress polygon - Duolingo green */}
                  <path
                    d={currentPathData}
                    fill="rgba(34, 197, 94, 0.08)"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    filter="url(#chartShadow)"
                  />
                  
                  {/* Data points with Apple styling */}
                  {radarPoints.map((point, index) => (
                    <circle
                      key={`point-${index}`}
                      cx={point.current.x}
                      cy={point.current.y}
                      r="3.5"
                      fill="#22c55e"
                      stroke="#ffffff"
                      strokeWidth="2"
                      filter="url(#chartShadow)"
                    />
                  ))}
                  
                  {/* Skill labels with proper positioning */}
                  {radarPoints.map((point, index) => {
                    // Fixed positions for each skill to avoid overlaps
                    const labelPositions = [
                      // Alphabet (top)
                      { x: 180, y: 65, anchor: "middle", percentY: 78 },
                      // Sight Words (top right) 
                      { x: 280, y: 120, anchor: "start", percentY: 133 },
                      // Vocabulary (bottom right)
                      { x: 280, y: 230, anchor: "start", percentY: 243 },
                      // Phonemic Awareness (bottom left)
                      { x: 80, y: 230, anchor: "end", percentY: 243 },
                      // Point-and-Read (top left)
                      { x: 80, y: 120, anchor: "end", percentY: 133 }
                    ]
                    
                    const pos = labelPositions[index]
                    
                    return (
                      <g key={`label-group-${index}`}>
                        {/* Skill name */}
                        <text
                          x={pos.x}
                          y={pos.y}
                          textAnchor={pos.anchor}
                          className="fill-gray-700 select-none"
                          style={{ 
                            fontSize: '10px', 
                            fontWeight: '600',
                            fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                          }}
                        >
                          {t(`progress.skills.${point.skill.name}.name`, { defaultValue: point.skill.name })}
                        </text>
                        
                        {/* Percentage */}
                        <text
                          x={pos.x}
                          y={pos.percentY}
                          textAnchor={pos.anchor}
                          className="fill-green-600 select-none"
                          style={{ 
                            fontSize: '10px', 
                            fontWeight: '700',
                            fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                          }}
                        >
                          {point.skill.progress}%
                        </text>
                      </g>
                    )
                  })}
                  
                  {/* Clean Apple-style legend */}
                  <g>
                    {/* Current level indicator */}
                    <line x1="20" y1="260" x2="35" y2="260" stroke="#22c55e" strokeWidth="2.5" />
                    <text 
                      x="40" 
                      y="264" 
                      className="fill-gray-600 select-none"
                      style={{ 
                        fontSize: '10px', 
                        fontWeight: '500',
                        fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                      }}
                    >
                      {t('progress.radar.legend.current')}
                    </text>
                    
                    {/* Goal level indicator */}
                    <line x1="140" y1="260" x2="155" y2="260" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="3,3" />
                    <text 
                      x="160" 
                      y="264" 
                      className="fill-gray-600 select-none"
                      style={{ 
                        fontSize: '10px', 
                        fontWeight: '500',
                        fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                      }}
                    >
                      {t('progress.radar.legend.goal')}
                    </text>
                  </g>
            </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        )}

        {/* Skills Breakdown */}
        <div className="space-y-4">
          <h2 className={`${isLarge ? 'text-2xl' : 'text-lg'} font-semibold text-gray-900`}>{t('progress.skills.title')}</h2>
          <div className="space-y-3">
            {skillsData.map((skill, index) => {
              const isNeedsFocus = skill.status === 'needs-focus'
              const priorityBadge = index === 0 && isNeedsFocus ? t('progress.skills.focusFirst') : null
              
              return (
                <Card 
                  key={skill.name} 
                  className={`backdrop-blur-sm border-0 shadow-sm ${
                    isNeedsFocus ? 'bg-orange-50/80 border-l-4 border-l-orange-400' : 
                    'bg-green-50/80 border-l-4 border-l-green-400'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {!isLarge && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isNeedsFocus ? 'bg-orange-100' : 'bg-green-100'
                        }`}>
                          <skill.icon className={`w-4 h-4 stroke-2 ${
                            isNeedsFocus ? 'text-orange-600' : 'text-green-600'
                          }`} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{t(`progress.skills.${skill.name}.name`, { defaultValue: skill.name })}</h3>
                            {priorityBadge && (
                              <Badge 
                                variant="secondary"
                                className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 border-orange-200"
                              >
                                {priorityBadge}
                              </Badge>
                            )}
                          </div>
                          <span className={`font-bold tabular-nums ${
                            isNeedsFocus ? 'text-orange-600' : 'text-green-600'
                          }`}>{skill.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              isNeedsFocus ? 'bg-orange-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${skill.progress}%` }}
                          />
            </div>
                        {!isLarge && (
                          <p className="text-sm text-gray-600 leading-relaxed">{t(`progress.skills.${skill.name}.insight`, { defaultValue: skill.insight })}</p>
                        )}
                        <div className="mt-2 text-xs text-gray-500">
                          {t(`progress.skills.goalLabel`)} {skill.Goal}% • 
                          {skill.progress >= skill.Goal ? (
                            <span className="text-green-600 font-medium">{t('progress.skills.aboveGoal')}</span>
                          ) : (
                            <span className="text-gray-600 font-medium">{t('progress.skills.onTrack', { remaining: skill.Goal - skill.progress })}</span>
                          )}
            </div>
            </div>
            </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* AI Personalized Practices */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="space-y-4">
              <h2 className={`${isLarge ? 'text-2xl' : 'text-lg'} font-semibold text-gray-900`}>{t('progress.ai.title')}</h2>
              <p className="text-sm text-gray-600">{t('progress.ai.subtitle')}</p>
              
              <div className="space-y-3">
                {aiRecommendations.map((rec, index) => {
                  const isPriority = rec.priority === 'high'
                  
                  return (
                    <Card key={index} className="bg-white border border-gray-200 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {!isLarge && (
                            <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                              <rec.icon className="w-5 h-5 stroke-2 text-green-600" />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className={`font-semibold text-gray-900 ${isLarge ? 'text-lg' : 'text-sm'}`}>
                                    {t(`progress.ai.recs.${index}.title`, { defaultValue: rec.title })} ({rec.skillProgress}%)
                                  </h3>
                                  {isPriority && (
                                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs px-1.5 py-0.5">
                                      {t('progress.ai.priority')}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-gray-500 font-medium">{t(`progress.skills.${rec.skill}.name`, { defaultValue: rec.skill })}</span>
                                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                    {t('progress.ai.minutes_one', { count: parseInt(rec.timeNeeded) || 5 })}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">{t(`progress.ai.recs.${index}.description`, { defaultValue: rec.description })}</p>
                            
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 font-semibold text-sm rounded-xl border-0 shadow-sm transition-all"
                            >
                              <Play className="w-4 h-4 mr-1.5 stroke-2" />
                              {t('progress.ai.startPractice')}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
      </Card>
                  )
                })}
              </div>
              
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-xs text-green-700 font-medium text-center">
                  {t('progress.ai.tip')}
                </p>
              </div>
            </div>
          </CardContent>
          </Card>

        {/* Progress Over Time */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
          <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
                { !isLarge && <TrendingUp className="w-5 h-5 text-green-600 stroke-2" />}
                <h2 className={`${isLarge ? 'text-2xl' : 'text-lg'} font-semibold text-gray-900 text-center`}>{t('progress.trend.title')}</h2>
          </div>

              <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      className="text-xs text-gray-500"
                    />
                    <YAxis 
                      domain={[60, 85]} 
                      axisLine={false}
                      tickLine={false}
                      className="text-xs text-gray-500"
                    />
                <Line
                  type="monotone"
                      dataKey="score"
                      stroke="#22c55e"
                  strokeWidth="3"
                      dot={{ fill: "#22c55e", strokeWidth: 0, r: 5 }}
                      activeDot={{ r: 7, fill: "#16a34a" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

              {/* Milestone markers */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{t('progress.trend.milestone1')}</span>
          </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{t('progress.trend.milestone2')}</span>
                </div>
              </div>
              
              {/* Motivational text */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-green-800 text-center">
                  {t('progress.trend.motivation')}
                </p>
          </div>
        </div>
          </CardContent>
      </Card>

        {/* Bottom padding for navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  )
}