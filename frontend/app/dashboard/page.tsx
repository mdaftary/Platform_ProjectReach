"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Clock,
  Target,
  Star,
  Calendar,
  MessageSquare,
  Trophy,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export default function ParentDashboard() {
  // Mock data for charts
  const progressData = [
    { week: "Week 1", english: 75, math: 80, science: 70 },
    { week: "Week 2", english: 82, math: 85, science: 78 },
    { week: "Week 3", english: 88, math: 82, science: 85 },
    { week: "Week 4", english: 85, math: 90, science: 88 },
  ]

  const engagementData = [
    { day: "Mon", hours: 1.5 },
    { day: "Tue", hours: 2.0 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 2.2 },
    { day: "Fri", hours: 1.6 },
    { day: "Sat", hours: 2.5 },
    { day: "Sun", hours: 2.0 },
  ]

  const badges = [
    { name: "Reading Star", description: "Completed 10 reading assignments", earned: true, icon: "⭐" },
    { name: "Math Wizard", description: "Perfect score on 5 math exercises", earned: true, icon: "🧙‍♂️" },
    { name: "Creative Artist", description: "Submitted 3 art projects", earned: true, icon: "🎨" },
    { name: "Science Explorer", description: "Completed nature observation", earned: false, icon: "🔬" },
    { name: "Discussion Leader", description: "Active in parent forums", earned: true, icon: "💬" },
  ]

  const recommendations = [
    {
      type: "practice",
      title: "Focus on Number Writing",
      description: "Emma could benefit from 10 minutes daily practice writing numbers 6-9",
      priority: "high",
      icon: <Target className="w-4 h-4" />,
    },
    {
      type: "reading",
      title: "Phonics Practice",
      description: "Try reading books with 'ch' and 'sh' sounds together",
      priority: "medium",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      type: "engagement",
      title: "Join Discussion",
      description: "Other parents are discussing K3 transition tips",
      priority: "low",
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">REACH Hong Kong</h1>
                  <p className="text-sm text-muted-foreground">Parent Dashboard</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Emma Chen - K3
              </Badge>
              <Button variant="outline" size="sm">
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, Sarah Chen</h2>
          <p className="text-muted-foreground">Track Emma's learning journey and connect with the REACH community</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="recommendations">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Assignments</p>
                      <p className="text-xl font-bold text-foreground">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Badges Earned</p>
                      <p className="text-xl font-bold text-foreground">7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Grade</p>
                      <p className="text-xl font-bold text-foreground">87%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">This Week</p>
                      <p className="text-xl font-bold text-foreground">12.5h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Upcoming */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Math assignment submitted</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Earned "Reading Star" badge</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Joined parent discussion</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">English Reading</p>
                      <p className="text-sm text-muted-foreground">Due tomorrow</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Pending
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Art Project</p>
                      <p className="text-sm text-muted-foreground">Due in 3 days</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Pending
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Science Observation</p>
                      <p className="text-sm text-muted-foreground">Due next week</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Pending
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subject Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Subject Progress Over Time</CardTitle>
                  <CardDescription>Emma's performance across different subjects</CardDescription>
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
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Subject Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Subject Performance</CardTitle>
                  <CardDescription>Emma's latest scores by subject</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">English</span>
                      <span className="font-medium text-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Mathematics</span>
                      <span className="font-medium text-foreground">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Science</span>
                      <span className="font-medium text-foreground">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Art & Creativity</span>
                      <span className="font-medium text-foreground">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievement Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span>Achievement Badges</span>
                </CardTitle>
                <CardDescription>Emma's learning milestones and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border text-center ${
                        badge.earned ? "bg-accent/10 border-accent/20" : "bg-muted/50 border-muted opacity-60"
                      }`}
                    >
                      <div className="text-2xl mb-2">{badge.icon}</div>
                      <h4 className="font-medium text-sm text-foreground mb-1">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                      {badge.earned && (
                        <Badge variant="secondary" className="mt-2 text-xs bg-accent text-accent-foreground">
                          Earned
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Engagement */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Learning Time</CardTitle>
                  <CardDescription>Hours spent on assignments and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#FFA500" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Community Engagement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Community Engagement</span>
                  </CardTitle>
                  <CardDescription>Your participation in the REACH community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Forum Posts</p>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </div>
                    <span className="text-2xl font-bold text-primary">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Helpful Answers</p>
                      <p className="text-sm text-muted-foreground">Given to other parents</p>
                    </div>
                    <span className="text-2xl font-bold text-accent-foreground">8</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Volunteer Hours</p>
                      <p className="text-sm text-muted-foreground">Time Auction credits</p>
                    </div>
                    <span className="text-2xl font-bold text-primary">4.5h</span>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/community">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Join Discussions
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-primary" />
                  <span>Weekly Leaderboard</span>
                </CardTitle>
                <CardDescription>Top engaged families this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "Chen Family", hours: 15.5, badge: "🥇" },
                    { rank: 2, name: "Wong Family", hours: 14.2, badge: "🥈" },
                    { rank: 3, name: "Li Family", hours: 13.8, badge: "🥉" },
                    { rank: 4, name: "Your Family", hours: 12.5, badge: "" },
                    { rank: 5, name: "Zhang Family", hours: 11.9, badge: "" },
                  ].map((family) => (
                    <div
                      key={family.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        family.name === "Your Family" ? "bg-primary/10 border border-primary/20" : "bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{family.badge || `#${family.rank}`}</span>
                        <span className="font-medium text-foreground">{family.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{family.hours}h</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <span>Personalized Recommendations</span>
                </CardTitle>
                <CardDescription>AI-powered insights to help Emma's learning journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">{rec.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {rec.priority} priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Patterns</CardTitle>
                  <CardDescription>When Emma learns best</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Best Learning Time</span>
                      <span className="font-medium text-foreground">Morning (9-11 AM)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Preferred Subject</span>
                      <span className="font-medium text-foreground">Art & Creativity</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Learning Style</span>
                      <span className="font-medium text-foreground">Visual & Hands-on</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Attention Span</span>
                      <span className="font-medium text-foreground">15-20 minutes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Areas for Growth</CardTitle>
                  <CardDescription>Skills to focus on next</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 border rounded">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Number formation (6, 9)</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 border rounded">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Phonics blending</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 border rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Following multi-step instructions</span>
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
