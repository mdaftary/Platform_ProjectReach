"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  MessageSquare,
  Award,
  AlertCircle,
  CheckCircle,
  Download,
  Filter,
} from "lucide-react"
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
  Area,
  AreaChart,
} from "recharts"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"

export default function AdminDashboard() {
  const { t } = useTranslation()
  // Mock data for analytics
  const overviewStats = {
    totalStudents: 156,
    activeAssignments: 12,
    submissionRate: 87,
    avgGrade: 84,
    forumPosts: 234,
    volunteerHours: 45.5,
  }

  const submissionTrends = [
    { week: "Week 1", submissions: 142, onTime: 128, late: 14 },
    { week: "Week 2", submissions: 138, onTime: 125, late: 13 },
    { week: "Week 3", submissions: 145, onTime: 132, late: 13 },
    { week: "Week 4", submissions: 151, onTime: 139, late: 12 },
  ]

  const engagementData = [
    { day: "Mon", hours: 45.2, posts: 12 },
    { day: "Tue", hours: 52.1, posts: 18 },
    { day: "Wed", hours: 48.7, posts: 15 },
    { day: "Thu", hours: 55.3, posts: 22 },
    { day: "Fri", hours: 42.8, posts: 14 },
    { day: "Sat", hours: 38.5, posts: 8 },
    { day: "Sun", hours: 35.2, posts: 6 },
  ]

  const gradeDistribution = [
    { grade: "A (90-100)", count: 45, percentage: 28.8 },
    { grade: "B (80-89)", count: 62, percentage: 39.7 },
    { grade: "C (70-79)", count: 35, percentage: 22.4 },
    { grade: "D (60-69)", count: 12, percentage: 7.7 },
    { grade: "F (0-59)", count: 2, percentage: 1.3 },
  ]

  const subjectPerformance = [
    { subject: "English", avgGrade: 86, submissions: 156, completion: 94 },
    { subject: "Mathematics", avgGrade: 82, submissions: 148, completion: 89 },
    { subject: "Science", avgGrade: 88, submissions: 142, completion: 91 },
    { subject: "Art", avgGrade: 91, submissions: 139, completion: 87 },
  ]

  const studentList = [
    {
      id: "1",
      name: "Emma Chen",
      grade: "K3",
      avgScore: 87,
      submissions: 12,
      lastActive: "2 hours ago",
      status: "active",
    },
    {
      id: "2",
      name: "Lucas Wong",
      grade: "K3",
      avgScore: 92,
      submissions: 11,
      lastActive: "1 day ago",
      status: "active",
    },
    {
      id: "3",
      name: "Sophia Li",
      grade: "K3",
      avgScore: 78,
      submissions: 9,
      lastActive: "3 days ago",
      status: "at-risk",
    },
    {
      id: "4",
      name: "Ryan Zhang",
      grade: "K3",
      avgScore: 85,
      submissions: 12,
      lastActive: "5 hours ago",
      status: "active",
    },
  ]

  const COLORS = ["#FFA500", "#FFD700", "#4B5563", "#F9F9F9", "#E5E7EB"]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "at-risk":
        return <Badge variant="destructive">At Risk</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{t('admin.dashboard.header')}</h1>
                <p className="text-sm text-muted-foreground">{t('admin.dashboard.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all-students">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-students">{t('admin.dashboard.filters.allStudents')}</SelectItem>
                  <SelectItem value="k3-only">{t('admin.dashboard.filters.k3Only')}</SelectItem>
                  <SelectItem value="active-only">{t('admin.dashboard.filters.activeOnly')}</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                {t('admin.dashboard.exportData')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">{t('admin.dashboard.tabs.overview')}</TabsTrigger>
            <TabsTrigger value="students">{t('admin.dashboard.tabs.students')}</TabsTrigger>
            <TabsTrigger value="assignments">{t('admin.dashboard.tabs.assignments')}</TabsTrigger>
            <TabsTrigger value="community">{t('admin.dashboard.tabs.community')}</TabsTrigger>
            <TabsTrigger value="reports">{t('admin.dashboard.tabs.reports')}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('admin.dashboard.overview.totalStudents')}</p>
                      <p className="text-2xl font-bold text-foreground">{overviewStats.totalStudents}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('admin.dashboard.overview.activeAssignments')}</p>
                      <p className="text-2xl font-bold text-foreground">{overviewStats.activeAssignments}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('admin.dashboard.overview.submissionRate')}</p>
                      <p className="text-2xl font-bold text-foreground">{overviewStats.submissionRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-accent-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('admin.dashboard.overview.avgGrade')}</p>
                      <p className="text-2xl font-bold text-foreground">{overviewStats.avgGrade}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('admin.dashboard.overview.forumPosts')}</p>
                      <p className="text-2xl font-bold text-foreground">{overviewStats.forumPosts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-accent-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('admin.dashboard.overview.volunteerHours')}</p>
                      <p className="text-2xl font-bold text-foreground">{overviewStats.volunteerHours}h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Submission Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.overview.submissionTrendsTitle')}</CardTitle>
                  <CardDescription>{t('admin.dashboard.overview.submissionTrendsDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={submissionTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="onTime" stackId="1" stroke="#FFA500" fill="#FFA500" />
                      <Area type="monotone" dataKey="late" stackId="1" stroke="#dc2626" fill="#dc2626" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Grade Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.overview.gradeDistributionTitle')}</CardTitle>
                  <CardDescription>{t('admin.dashboard.overview.gradeDistributionDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={gradeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Daily Engagement */}
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.dashboard.overview.engagementTitle')}</CardTitle>
                <CardDescription>{t('admin.dashboard.overview.engagementDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="hours" fill="#FFA500" name={t('admin.dashboard.overview.series.learningHours')} />
                    <Bar yAxisId="right" dataKey="posts" fill="#FFD700" name={t('admin.dashboard.overview.series.forumPosts')} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            {/* Student Performance Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.students.subjectPerformanceTitle')}</CardTitle>
                  <CardDescription>{t('admin.dashboard.students.subjectPerformanceDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectPerformance.map((subject) => (
                      <div key={subject.subject} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-foreground">{subject.subject}</span>
                          <span className="text-muted-foreground">
                            {subject.avgGrade}% avg • {subject.completion}% completion
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${subject.avgGrade}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.students.statusOverviewTitle')}</CardTitle>
                  <CardDescription>{t('admin.dashboard.students.statusOverviewDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-foreground">{t('admin.dashboard.students.activeStudents')}</span>
                      </div>
                      <span className="font-bold text-foreground">142 (91%)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span className="text-foreground">{t('admin.dashboard.students.atRisk')}</span>
                      </div>
                      <span className="font-bold text-foreground">12 (8%)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-red-500" />
                        <span className="text-foreground">{t('admin.dashboard.students.inactive')}</span>
                      </div>
                      <span className="font-bold text-foreground">2 (1%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Student List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t('admin.dashboard.students.studentManagement')}</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-1" />
                      {t('admin.dashboard.students.filter')}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      {t('admin.dashboard.students.export')}
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>{t('admin.dashboard.students.studentTrackingDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentList.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-medium text-primary">{student.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">Grade {student.grade}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Avg Score</p>
                          <p className="font-bold text-foreground">{student.avgScore}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Submissions</p>
                          <p className="font-bold text-foreground">{student.submissions}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Last Active</p>
                          <p className="text-sm text-foreground">{student.lastActive}</p>
                        </div>
                        <div className="text-center">{getStatusBadge(student.status)}</div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Assignments</span>
                    <span className="font-bold text-foreground">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Currently Active</span>
                    <span className="font-bold text-foreground">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avg Completion Rate</span>
                    <span className="font-bold text-foreground">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avg Grade</span>
                    <span className="font-bold text-foreground">84%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.assignments.timelinessTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('admin.dashboard.assignments.onTime')}</span>
                    <span className="font-bold text-green-600">89%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('admin.dashboard.assignments.late')}</span>
                    <span className="font-bold text-orange-500">8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('admin.dashboard.assignments.missing')}</span>
                    <span className="font-bold text-red-500">3%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.assignments.gradingStatusTitle')}</CardTitle>
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

            {/* Assignment Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Assignment Performance Trends</CardTitle>
                <CardDescription>Average scores and submission rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={submissionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="submissions" stroke="#FFA500" strokeWidth={2} name="Submissions" />
                    <Line type="monotone" dataKey="onTime" stroke="#22c55e" strokeWidth={2} name="On Time" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Posts</p>
                      <p className="text-2xl font-bold text-foreground">234</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold text-foreground">89</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-accent-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Volunteer Hours</p>
                      <p className="text-2xl font-bold text-foreground">45.5h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Engagement Rate</p>
                      <p className="text-2xl font-bold text-foreground">73%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Community Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.dashboard.community.activityTrendsTitle')}</CardTitle>
                <CardDescription>{t('admin.dashboard.community.activityTrendsDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="posts" stroke="#FFA500" fill="#FFA500" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.dashboard.reports.generateReports')}</CardTitle>
                  <CardDescription>{t('admin.dashboard.reports.generateReportsDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Download className="w-4 h-4 mr-2" />
                    {t('admin.dashboard.reports.studentProgressReport')}
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    {t('admin.dashboard.reports.assignmentAnalytics')}
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    {t('admin.dashboard.reports.communityEngagement')}
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    {t('admin.dashboard.reports.platformUsage')}
                  </Button>
                </CardContent>
              </Card>

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
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
