"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  BarChart3,
  Download,
  Filter,
  Search,
  Eye,
  ChevronRight,
  MapPin,
  Calendar,
  BookOpen,
  Brain,
  Timer,
  FileText
} from "lucide-react"
import Link from "next/link"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts"
import { 
  MOCK_STUDENTS,
  AGGREGATE_STATS,
  REGIONAL_STATS,
  AGE_GROUP_STATS,
  SUBJECT_PERFORMANCE,
  WEEKLY_TREND,
  getStudentsByPage
} from "@/lib/mock-student-data"

export default function AdminDashboard() {
  const { t } = useTranslation('common')
  
  // Get recent students for the students tab
  const recentStudents = MOCK_STUDENTS.slice(0, 20)

  // Helper functions to translate chart data
  const translateSubject = (subject: string) => {
    const subjectMap: Record<string, string> = {
      'Alphabet': t('admin.charts.subjects.alphabet'),
      'Sight Words': t('admin.charts.subjects.sightwords'),
      'Vocabulary': t('admin.charts.subjects.vocabulary'),
      'Phonics': t('admin.charts.subjects.phonics')
    }
    return subjectMap[subject]
  }

  const translateRegion = (region: string) => {
    const regionMap: Record<string, string> = {
      'Central Hong Kong': t('admin.charts.regions.centralHongKong'),
      'Kowloon East': t('admin.charts.regions.kowloonEast'),
      'Kowloon West': t('admin.charts.regions.kowloonWest'),
      'New Territories': t('admin.charts.regions.newTerritories')
    }
    return regionMap[region] || region
  }

  const translateWeek = (week: string) => {
    const weekMap: Record<string, string> = {
      'Week 1': t('admin.charts.time.week1'),
      'Week 2': t('admin.charts.time.week2'),
      'Week 3': t('admin.charts.time.week3'),
      'Week 4': t('admin.charts.time.week4')
    }
    return weekMap[week] || week
  }

  // Translate chart data
  const translatedWeeklyTrend = WEEKLY_TREND.map(item => ({
    ...item,
    week: translateWeek(item.week)
  }))

  const translatedRegionalStats = REGIONAL_STATS.map(item => ({
    ...item,
    region: translateRegion(item.region)
  }))

  const translatedSubjectPerformance = SUBJECT_PERFORMANCE.map(item => ({
    ...item,
    subject: translateSubject(item.subject)
  }))

  const translatedAgeGroupStats = AGE_GROUP_STATS.map(item => ({
    ...item,
    age: `${item.age.split(' ')[0]} ${t('admin.charts.time.years')}`
  }))

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 80) return "text-blue-600 bg-blue-100" 
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" suppressHydrationWarning={true}>
      {/* Header */}
      <header className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                {t('admin.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t('admin.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/grading">
                <Button variant="default" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  {t('admin.grading.title')}
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {t('admin.exportData')}
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                {t('admin.filter')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('admin.totalStudents')}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{AGGREGATE_STATS.totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('admin.averageScore')}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{AGGREGATE_STATS.averageScore}%</p>
                </div>
                <Target className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('admin.totalAttempts')}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{AGGREGATE_STATS.totalAttempts.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('admin.avgTimePerAttempt')}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{AGGREGATE_STATS.averageTimePerAttempt}s</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('admin.activeToday')}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{AGGREGATE_STATS.activeToday}</p>
                </div>
                <Award className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">{t('admin.overview')}</TabsTrigger>
            <TabsTrigger value="students">{t('admin.students')}</TabsTrigger>
            <TabsTrigger value="performance">{t('admin.performance')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('admin.analytics')}</TabsTrigger>
            <TabsTrigger value="reports">{t('admin.reports')}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Progress Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.weeklyProgress')}</CardTitle>
                  <CardDescription>{t('admin.weeklyProgressDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={translatedWeeklyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="avgScore" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.3}
                        name={t('admin.averageScore')}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Regional Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.regionalPerformance')}</CardTitle>
                  <CardDescription>{t('admin.regionalPerformanceDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={translatedRegionalStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avgScore" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Age Group Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.ageGroupPerformance')}</CardTitle>
                  <CardDescription>{t('admin.ageGroupPerformanceDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={translatedAgeGroupStats}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="avgScore"
                        label={({age, avgScore}) => `${age}: ${avgScore}%`}
                      >
                        {AGE_GROUP_STATS.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Subject Performance Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.subjectOverview')}</CardTitle>
                  <CardDescription>{t('admin.subjectOverviewDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {translatedSubjectPerformance.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{t(`${subject.subject.toLowerCase().replace(' ', '')}`) || subject.subject}</span>
                        <span className="text-gray-500">{subject.avgScore}%</span>
                      </div>
                      <Progress value={subject.avgScore} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{subject.totalAttempts} {t('admin.attempts')}</span>
                        <span>~{subject.avgTime.toFixed(0)}s avg</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.studentDirectory')}</CardTitle>
                <CardDescription>
                  {t('admin.studentDirectoryDesc')}
                </CardDescription>
                <div className="flex items-center gap-4 mt-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('admin.searchStudents')}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    {t('admin.filter')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{student.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {t('admin.age')} {student.age}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {student.region}
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {student.kindergarten}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge className={getPerformanceColor(student.overallScore)}>
                                {student.overallScore}% {t('admin.overallScore')}
                              </Badge>
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Brain className="w-3 h-3" />
                                {student.totalAttempts} {t('admin.attempts')}
                              </span>
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                {formatTime(student.totalTimeSpent)} {t('admin.total')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {student.streakDays} {t('admin.dayStreak')}
                            </p>
                            <p className="text-xs text-gray-500">
                              {t('admin.lastActive')}: {new Date(student.lastActive).toLocaleDateString()}
                            </p>
                          </div>
                          <Link href={`/admin/students/${student.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              {t('admin.view')}
                              <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subject Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.subjectComparison')}</CardTitle>
                  <CardDescription>{t('admin.subjectComparisonDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={translatedSubjectPerformance} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="subject" type="category" />
                      <Tooltip />
                      <Bar dataKey="avgScore" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Attempt Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.learningEfficiency')}</CardTitle>
                  <CardDescription>{t('admin.learningEfficiencyDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('admin.dashboard.assignments.graded')}</span>
                    <span className="font-bold text-green-600">142</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('admin.dashboard.assignments.pendingReview')}</span>
                    <span className="font-bold text-orange-500">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('admin.dashboard.assignments.aiPreGraded')}</span>
                    <span className="font-bold text-green-600">12</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.detailedMetrics')}</CardTitle>
                <CardDescription>{t('admin.detailedMetricsDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">{t('admin.subject')}</th>
                        <th className="text-right p-3 font-medium">{t('admin.avgScore')}</th>
                        <th className="text-right p-3 font-medium">{t('admin.totalAttempts')}</th>
                        <th className="text-right p-3 font-medium">{t('admin.avgTime')}</th>
                        <th className="text-right p-3 font-medium">{t('admin.successRate')}</th>
                        <th className="text-right p-3 font-medium">{t('admin.difficultyIndex')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {translatedSubjectPerformance.map((subject) => {
                        const successRate = (subject.avgScore / 100) * 100
                        const difficultyIndex = subject.avgTime / subject.avgScore * 100
                        
                        return (
                          <tr key={subject.subject} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="p-3 font-medium">{t(`admin.charts.subjects.${subject.subject.toLowerCase().replace(' ', '')}`)}</td>
                            <td className="p-3 text-right">
                              <Badge className={getPerformanceColor(subject.avgScore)}>
                                {subject.avgScore}%
                              </Badge>
                            </td>
                            <td className="p-3 text-right">{subject.totalAttempts}</td>
                            <td className="p-3 text-right">{subject.avgTime.toFixed(1)}s</td>
                            <td className="p-3 text-right">{successRate.toFixed(1)}%</td>
                            <td className="p-3 text-right">
                              <Badge variant={difficultyIndex > 80 ? "destructive" : difficultyIndex > 60 ? "secondary" : "default"}>
                                {difficultyIndex > 80 ? t('admin.high') : difficultyIndex > 60 ? t('admin.medium') : t('admin.low')}
                              </Badge>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.engagementMetrics')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('admin.dailyActiveUsers')}</span>
                      <span className="font-bold">{AGGREGATE_STATS.activeToday}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('admin.avgSessionTime')}</span>
                      <span className="font-bold">{t('admin.values.avgSessionTime')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('admin.completionRate')}</span>
                      <span className="font-bold">{t('admin.values.completionRate')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('admin.returnRate')}</span>
                      <span className="font-bold">{t('admin.values.returnRate')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.learningInsights')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('admin.mostDifficult')}</span>
                      <span className="font-bold text-red-600">{t('admin.values.mostDifficultSubject')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('admin.fastestImprovement')}</span>
                      <span className="font-bold text-green-600">{t('admin.values.fastestImprovementSubject')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('admin.peakLearningTime')}</span>
                      <span className="font-bold">{t('admin.values.peakLearningTime')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('admin.avgQuestionsPerSession')}</span>
                      <span className="font-bold">{t('admin.values.avgQuestionsPerSession')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.regionalStats')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {translatedRegionalStats.map((region) => (
                      <div key={region.region} className="flex justify-between items-center">
                        <span className="text-sm">{region.region}</span>
                        <div className="text-right">
                          <span className="font-bold">{region.avgScore}%</span>
                          <span className="text-xs text-gray-500 ml-2">({region.students} {t('admin.students')})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.generateReports')}</CardTitle>
                <CardDescription>{t('admin.generateReportsDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    <span>{t('admin.performanceReport')}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="w-6 h-6 mb-2" />
                    <span>{t('admin.studentSummary')}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <TrendingUp className="w-6 h-6 mb-2" />
                    <span>{t('admin.progressReport')}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <MapPin className="w-6 h-6 mb-2" />
                    <span>{t('admin.regionalAnalysis')}</span>
                  </Button>
                </div>
              </CardContent>

              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.reports.quickInsights')}</CardTitle>
                  <CardDescription>{t('admin.dashboard.reports.quickInsightsDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">{t('admin.dashboard.reports.positiveTrend')}</p>
                    <p className="text-sm text-green-700">{t('admin.dashboard.reports.positiveTrendDesc')}</p>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm font-medium text-orange-800">{t('admin.dashboard.reports.attentionNeeded')}</p>
                    <p className="text-sm text-orange-700">{t('admin.dashboard.reports.attentionNeededDesc')}</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">{t('admin.dashboard.reports.opportunity')}</p>
                    <p className="text-sm text-green-700">{t('admin.dashboard.reports.opportunityDesc')}</p>
                  </div>
                </CardContent>
              </Card>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}