"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { User, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  // Mock student data
  const student = {
    id: params.id,
    name: "Emma Chen",
    grade: "K3",
    parentName: "Sarah Chen",
    parentEmail: "sarah.chen@email.com",
    parentPhone: "+852 9123 4567",
    enrollmentDate: "2024-09-01",
    avgScore: 87,
    totalSubmissions: 12,
    onTimeSubmissions: 11,
    status: "active",
    lastActive: "2 hours ago",
  }

  const progressData = [
    { week: "Week 1", english: 82, math: 78, science: 85, art: 90 },
    { week: "Week 2", english: 85, math: 82, science: 88, art: 92 },
    { week: "Week 3", english: 88, math: 85, science: 90, art: 89 },
    { week: "Week 4", english: 87, math: 88, science: 92, art: 94 },
  ]

  const skillsData = [
    { skill: "Reading", score: 88 },
    { skill: "Writing", score: 82 },
    { skill: "Math", score: 85 },
    { skill: "Science", score: 90 },
    { skill: "Creativity", score: 94 },
    { skill: "Communication", score: 86 },
  ]

  const assignments = [
    {
      id: "1",
      title: "English Reading Comprehension",
      subject: "English",
      dueDate: "2025-08-23",
      submittedDate: "2025-08-22",
      grade: 85,
      status: "graded",
      feedback: "Good understanding of the story. Work on writing complete sentences.",
    },
    {
      id: "2",
      title: "Math Counting Practice",
      subject: "Mathematics",
      dueDate: "2025-08-25",
      submittedDate: "2025-08-24",
      grade: 92,
      status: "graded",
      feedback: "Excellent work! Numbers are written clearly and accurately.",
    },
    {
      id: "3",
      title: "Science Nature Walk",
      subject: "Science",
      dueDate: "2025-08-30",
      submittedDate: null,
      grade: null,
      status: "pending",
      feedback: null,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return <Badge className="bg-green-100 text-green-800">Graded</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "late":
        return <Badge variant="destructive">Late</Badge>
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
              <Link href="/admin" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Student Profile</h1>
                <p className="text-sm text-muted-foreground">
                  {student.name} - Grade {student.grade}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-1" />
                Contact Parent
              </Button>
              <Button variant="outline" size="sm">
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Student Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Student Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-primary">{student.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-bold text-foreground">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">Grade {student.grade}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Parent</p>
                    <p className="font-medium text-foreground">{student.parentName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{student.parentEmail}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{student.parentPhone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Enrolled</p>
                    <p className="font-medium text-foreground">
                      {new Date(student.enrollmentDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge className="bg-green-100 text-green-800 mt-1">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Avg Score</span>
                  <span className="font-bold text-foreground">{student.avgScore}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Submissions</span>
                  <span className="font-bold text-foreground">{student.totalSubmissions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">On Time Rate</span>
                  <span className="font-bold text-foreground">
                    {Math.round((student.onTimeSubmissions / student.totalSubmissions) * 100)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Active</span>
                  <span className="text-sm text-foreground">{student.lastActive}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Performance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Performance Trends</CardTitle>
                    <CardDescription>Subject performance over the past 4 weeks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="english" stroke="#FFA500" strokeWidth={2} name="English" />
                        <Line type="monotone" dataKey="math" stroke="#FFD700" strokeWidth={2} name="Math" />
                        <Line type="monotone" dataKey="science" stroke="#4B5563" strokeWidth={2} name="Science" />
                        <Line type="monotone" dataKey="art" stroke="#22c55e" strokeWidth={2} name="Art" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Skills Radar */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Assessment</CardTitle>
                    <CardDescription>Current skill levels across different areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={skillsData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar
                          name="Skills"
                          dataKey="score"
                          stroke="#FFA500"
                          fill="#FFA500"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Assignments Tab */}
              <TabsContent value="assignments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assignment History</CardTitle>
                    <CardDescription>Complete record of submitted assignments and grades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-foreground">{assignment.title}</h4>
                              <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(assignment.status)}
                              {assignment.grade && (
                                <p className="text-lg font-bold text-foreground mt-1">{assignment.grade}%</p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                              <p className="text-muted-foreground">Due Date</p>
                              <p className="text-foreground">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Submitted</p>
                              <p className="text-foreground">
                                {assignment.submittedDate
                                  ? new Date(assignment.submittedDate).toLocaleDateString()
                                  : "Not submitted"}
                              </p>
                            </div>
                          </div>

                          {assignment.feedback && (
                            <div className="bg-muted/50 rounded p-3">
                              <p className="text-sm font-medium text-foreground mb-1">Teacher Feedback</p>
                              <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Progress Tab */}
              <TabsContent value="progress" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Subject Progress</CardTitle>
                      <CardDescription>Current performance by subject</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { subject: "English", score: 87, target: 85 },
                        { subject: "Mathematics", score: 88, target: 80 },
                        { subject: "Science", score: 92, target: 85 },
                        { subject: "Art", score: 94, target: 90 },
                      ].map((item) => (
                        <div key={item.subject} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-foreground">{item.subject}</span>
                            <span className="text-muted-foreground">
                              {item.score}% (Target: {item.target}%)
                            </span>
                          </div>
                          <Progress value={item.score} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Goals</CardTitle>
                      <CardDescription>Areas for improvement and focus</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-sm font-medium text-orange-800">Focus Area</p>
                        <p className="text-sm text-orange-700">Number formation (6, 9) - Practice needed</p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">Strength</p>
                        <p className="text-sm text-blue-700">Creative expression and artistic skills</p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800">Achievement</p>
                        <p className="text-sm text-green-700">Excellent reading comprehension progress</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Student engagement and platform usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Submitted Math assignment</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Parent posted in assignment discussion</p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Received grade for English assignment</p>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
