"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFontSize } from "@/app/font-size-provider"
import {
  HelpCircle,
  Users,
  Clock,
  Star,
  MessageCircle,
  Trophy,
  Gift,
  Target,
  Timer,
  Send,
  Award,
  CheckCircle,
  Heart,
  User
} from "lucide-react"

// Mock data for volunteers with Time Auction integration
const volunteers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Former K3 Teacher",
    avatar: "👩‍🏫",
    rating: 4.9,
    hoursContributed: 42,
    timeAuctionBadge: "Gold Mentor",
    badgeColor: "bg-yellow-100 text-yellow-700",
    totalAnswers: 156,
    isOnline: true,
    specialties: ["Phonics", "Reading"]
  },
  {
    id: 2,
    name: "David Wong",
    role: "Parent of 3",
    avatar: "👨‍👨‍👧‍👦",
    rating: 4.8,
    hoursContributed: 28,
    timeAuctionBadge: "Silver Helper",
    badgeColor: "bg-gray-100 text-gray-700",
    totalAnswers: 89,
    isOnline: false,
    specialties: ["Homework Help", "Motivation"]
  },
  {
    id: 3,
    name: "Ms. Liu",
    role: "Child Psychologist",
    avatar: "👩‍⚕️",
    rating: 5.0,
    hoursContributed: 65,
    timeAuctionBadge: "Platinum Expert",
    badgeColor: "bg-purple-100 text-purple-700",
    totalAnswers: 203,
    isOnline: true,
    specialties: ["Learning Difficulties", "Development"]
  }
]

// Mock recent questions
const recentQuestions = [
  {
    id: 1,
    question: "My 5-year-old struggles with letter 'b' and 'd' - any tips?",
    author: "Anonymous Parent",
    timeAgo: "2 hours ago",
    answers: 3,
    isAnswered: true,
    category: "Phonics"
  },
  {
    id: 2,
    question: "How to motivate reluctant reader for daily practice?",
    author: "Worried Mom",
    timeAgo: "5 hours ago", 
    answers: 7,
    isAnswered: true,
    category: "Motivation"
  },
  {
    id: 3,
    question: "Best apps for sight word practice at home?",
    author: "Tech Dad",
    timeAgo: "1 day ago",
    answers: 12,
    isAnswered: true,
    category: "Resources"
  }
]

// Mock user's volunteer progress (if they're a volunteer)
const myProgress = {
  hoursThisMonth: 12,
  hoursGoal: 20,
  totalHours: 67,
  rank: 5,
  rewardsAvailable: 3,
  nextReward: "Free REACH Workshop"
}

export default function VolunteerPage() {
  const [showAskQuestion, setShowAskQuestion] = useState(false)
  const [question, setQuestion] = useState("")
  const [category, setCategory] = useState("General")
  const { isLarge } = useFontSize()

  return (
    <div className={`min-h-screen bg-gray-50 ${isLarge ? 'min-text-lg text-lg' : ''}`}>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Heart className="w-8 h-8 text-white stroke-2" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Volunteer & Time Auction</h1>
            <p className="text-gray-600">Answer parent questions, earn hours, redeem rewards</p>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold px-6 py-3 shadow-sm">
            <Timer className="w-5 h-5 mr-2 stroke-2" />
            Start Earning Hours
          </Button>
        </div>

        {/* Ask a Question Section */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-blue-600 stroke-2" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-900">Need Help?</h2>
                  <p className="text-sm text-gray-600">Get answers from experienced parents and teachers</p>
                </div>
              </div>
              
              {!showAskQuestion ? (
                <Button 
                  onClick={() => setShowAskQuestion(true)}
                  variant="outline" 
                  className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Send className="w-4 h-4 mr-2 stroke-2" />
                  Submit a Question
                </Button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>General</option>
                      <option>Phonics</option>
                      <option>Reading</option>
                      <option>Homework Help</option>
                      <option>Motivation</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Your Question</label>
                    <Textarea 
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Describe your child's learning challenge or ask for advice..."
                      className="min-h-20 resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setShowAskQuestion(false)}
                      variant="outline" 
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                      disabled={!question.trim()}
                    >
                      <Send className="w-4 h-4 mr-2 stroke-2" />
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* My Impact Section (for volunteers) */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600 stroke-2" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-900">My Impact</h2>
                  <p className="text-sm text-gray-600">Track your volunteer hours and rewards</p>
                </div>
              </div>

              {/* Hours Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">This Month: {myProgress.hoursThisMonth}/{myProgress.hoursGoal} hours</span>
                  <span className="text-green-600 font-semibold">{Math.round((myProgress.hoursThisMonth/myProgress.hoursGoal)*100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(myProgress.hoursThisMonth/myProgress.hoursGoal)*100}%` }}
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{myProgress.totalHours}</div>
                  <div className="text-xs text-gray-600">Total Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">#{myProgress.rank}</div>
                  <div className="text-xs text-gray-600">This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{myProgress.rewardsAvailable}</div>
                  <div className="text-xs text-gray-600">Rewards</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-green-600 border-green-200 hover:bg-green-50">
                  <Gift className="w-4 h-4 mr-2 stroke-2" />
                  Redeem Rewards
                </Button>
                <Button variant="outline" className="flex-1 text-orange-600 border-orange-200 hover:bg-orange-50">
                  <Trophy className="w-4 h-4 mr-2 stroke-2" />
                  Leaderboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Volunteers */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Available Volunteers</h2>
          
          <div className="space-y-3">
            {volunteers.map((volunteer) => (
              <Card key={volunteer.id} className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Volunteer Header */}
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-lg">
                        {volunteer.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{volunteer.name}</h3>
                          {volunteer.isOnline && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{volunteer.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 stroke-2" />
                          <span className="text-sm font-medium text-gray-700">{volunteer.rating}</span>
                          <span className="text-sm text-gray-500">• {volunteer.totalAnswers} answers</span>
                        </div>
                      </div>
                    </div>

                    {/* Time Auction Badge & Hours */}
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs px-2 py-1 ${volunteer.badgeColor}`}>
                        <Award className="w-3 h-3 mr-1 stroke-2" />
                        {volunteer.timeAuctionBadge}
                      </Badge>
                      <span className="text-xs text-gray-600">
                        {volunteer.hoursContributed} hours contributed
                      </span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1">
                      {volunteer.specialties.map((specialty) => (
                        <Badge 
                          key={specialty}
                          variant="outline" 
                          className="text-xs border-gray-200 text-gray-600"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
                      disabled={!volunteer.isOnline}
                    >
                      <MessageCircle className="w-4 h-4 mr-2 stroke-2" />
                      {volunteer.isOnline ? 'Answer Questions' : 'Offline'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Questions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Questions</h2>
          
          <div className="space-y-3">
            {recentQuestions.map((q) => (
              <Card key={q.id} className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-4 h-4 text-blue-600 stroke-2" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 leading-tight">{q.question}</h3>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <span>{q.author}</span>
                          <span>•</span>
                          <span>{q.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-blue-200 text-blue-600">
                          {q.category}
                        </Badge>
                        {q.isAnswered && (
                          <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1 stroke-2" />
                            Answered
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MessageCircle className="w-4 h-4 stroke-2" />
                        <span>{q.answers}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom spacing for navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  )
}