"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, MessageSquare } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function ProgressPage() {
  // Sample data for the 5 dimensions
  const skillsData = [
    { name: "Pronunciation", score: 95, color: "text-green-500", points: "Excellent clarity and accent work" },
    { name: "Vocabulary", score: 74, color: "text-yellow-500", points: "Good range, needs more advanced words" },
    { name: "Grammar", score: 80, color: "text-green-500", points: "Strong foundation, minor tense issues" },
    { name: "Fluency", score: 47, color: "text-orange-500", points: "Needs more speaking practice and confidence" },
    { name: "Filler Words", score: 81, color: "text-green-500", points: "Much improved, occasional 'um' usage" },
  ]

  const progressData = [
    { month: "Jan", grade: 65 },
    { month: "Feb", grade: 68 },
    { month: "Mar", grade: 71 },
    { month: "Apr", grade: 74 },
    { month: "May", grade: 76 },
    { month: "Jun", grade: 78 },
  ]

  const headmasterComments = [
    {
      date: "June 2024",
      comment:
        "Emma has shown remarkable improvement in pronunciation and grammar this month. I recommend focusing on fluency exercises to build confidence in speaking. Keep up the excellent work!",
      teacher: "Ms. Chen, Head Teacher",
    },
    {
      date: "December 2023",
      comment:
        "Good progress in vocabulary building. Emma is starting to use more complex sentence structures. Continue with reading exercises to improve fluency.",
      teacher: "Mr. Wong, Head Teacher",
    },
    {
      date: "June 2023",
      comment:
        "Emma shows great enthusiasm for learning. Focus areas should be pronunciation and reducing filler words. Overall trajectory is very positive.",
      teacher: "Ms. Chen, Head Teacher",
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* English Level Overview */}
      <Card className="p-6 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
        <div className="text-center space-y-2">
          <p className="text-blue-200">Your English Level</p>
          <h1 className="text-3xl font-bold">
            Proficient <span className="text-blue-400">C2</span>
          </h1>
          <p className="text-blue-200">74 out of 100</p>
        </div>
      </Card>

      {/* Skills Radar Chart Visualization */}
      <Card className="p-6 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="space-y-6">
          <div className="relative h-64 flex items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200" className="absolute">
              {/* Pentagon grid lines */}
              <polygon
                points="100,20 170,65 145,140 55,140 30,65"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <polygon
                points="100,40 150,70 130,130 70,130 50,70"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <polygon
                points="100,60 130,80 120,120 80,120 70,80"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />

              {/* Data polygon with gradient */}
              <defs>
                <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <polygon
                points="100,25 160,70 135,125 65,125 40,70"
                fill="url(#skillGradient)"
                stroke="#A855F7"
                strokeWidth="2"
              />

              {/* Light circles at data points */}
              <circle cx="100" cy="25" r="4" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
              <circle cx="160" cy="70" r="4" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
              <circle cx="135" cy="125" r="4" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
              <circle cx="65" cy="125" r="4" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
              <circle cx="40" cy="70" r="4" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
            </svg>

            {/* Skills positioned around the pentagon */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-green-400 text-lg font-bold">95%</div>
              <div className="text-xs text-gray-300">Pronunciation</div>
            </div>

            <div className="absolute top-12 right-4 text-center">
              <div className="text-yellow-400 text-lg font-bold">74%</div>
              <div className="text-xs text-gray-300">Vocabulary</div>
            </div>

            <div className="absolute bottom-8 right-8 text-center">
              <div className="text-green-400 text-lg font-bold">80%</div>
              <div className="text-xs text-gray-300">Grammar</div>
            </div>

            <div className="absolute bottom-8 left-8 text-center">
              <div className="text-orange-400 text-lg font-bold">47%</div>
              <div className="text-xs text-gray-300">Fluency</div>
            </div>

            <div className="absolute top-12 left-4 text-center">
              <div className="text-green-400 text-lg font-bold">81%</div>
              <div className="text-xs text-gray-300">Filler Words</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Skills Breakdown</h2>
        {skillsData.map((skill) => (
          <Card key={skill.name} className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">{skill.name}</span>
                <span className={`font-bold ${skill.color}`}>{skill.score}%</span>
              </div>
              <Progress value={skill.score} className="h-2" />
              <p className="text-sm text-gray-600 mt-2">{skill.points}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-800">Grade Progression</h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 85]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="grade"
                  stroke="#10B981"
                  strokeWidth="3"
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Improvement:</strong> You've improved by 13 points in the past 6 months! Keep practicing to reach
              85+ level.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">Headmaster's Comments</h3>
            <Badge variant="outline" className="text-xs">
              Every 6 months
            </Badge>
          </div>

          <div className="space-y-4">
            {headmasterComments.map((comment, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${index === 0 ? "bg-blue-50 border-l-4 border-blue-500" : "bg-gray-50"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{comment.date}</span>
                  {index === 0 && <Badge className="bg-blue-100 text-blue-800 text-xs">Latest</Badge>}
                </div>
                <p className="text-gray-700 italic mb-2">"{comment.comment}"</p>
                <p className="text-sm text-gray-500">- {comment.teacher}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
