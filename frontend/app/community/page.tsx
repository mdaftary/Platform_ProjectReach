"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MessageSquare,
  Users,
  Search,
  Plus,
  Heart,
  MessageCircle,
  Clock,
  Pin,
  HelpCircle,
  Share2,
  Download,
} from "lucide-react"

const timeAuctionVolunteers = [
  { name: "TeacherVolunteer", expertise: "Former K3 Teacher", hours: 4.5, answers: 12, available: true },
  { name: "ExperiencedMom", expertise: "Parent of 3", hours: 3.2, answers: 8, available: false },
  { name: "EducationExpert", expertise: "Child Psychologist", hours: 2.8, answers: 6, available: true },
  { name: "BilingualDad", expertise: "English/Chinese", hours: 2.1, answers: 5, available: true },
]

const sharedResources = [
  {
    id: 1,
    title: "Alphabet Practice Worksheets",
    author: "TeacherMom",
    downloads: 234,
    rating: 4.9,
    category: "Alphabet Time",
    type: "PDF",
  },
  {
    id: 2,
    title: "Sight Words Flashcards",
    author: "CreativeDad",
    downloads: 189,
    rating: 4.8,
    category: "Sight Words Time",
    type: "PDF",
  },
  {
    id: 3,
    title: "Reading Comprehension Tips",
    author: "ExperiencedMom",
    downloads: 156,
    rating: 4.7,
    category: "Reading Time",
    type: "Guide",
  },
]

const practiceGroups = [
  {
    id: 1,
    name: "Morning Alphabet Buddies",
    members: 12,
    nextSession: "Tomorrow 9:00 AM",
    level: "Beginner",
    description: "Practice alphabet recognition together",
  },
  {
    id: 2,
    name: "Vocabulary Champions",
    members: 8,
    nextSession: "Today 7:00 PM",
    level: "Intermediate",
    description: "Build vocabulary through fun activities",
  },
  {
    id: 3,
    name: "Reading Circle",
    members: 15,
    nextSession: "Wed 6:00 PM",
    level: "Advanced",
    description: "Read stories and discuss together",
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions")

  const tabs = [
    { id: "discussions", label: "Discussions", icon: MessageSquare },
    { id: "resources", label: "Resources", icon: Share2 },
    { id: "groups", label: "Groups", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-orange-600" />
            Community
          </h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search community..." className="pl-10" />
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`flex items-center gap-2 ${activeTab === tab.id ? "bg-orange-600 hover:bg-orange-700" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Discussions Tab */}
        {activeTab === "discussions" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Discussions</h2>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-1" />
                New Post
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <HelpCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800 text-sm">Get Help</h3>
                  <p className="text-xs text-blue-600 mb-2">Ask questions</p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                    Ask Question
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <Heart className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800 text-sm">Give Help</h3>
                  <p className="text-xs text-green-600 mb-2">Answer & earn points</p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                    Help Others
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Tips for K3 to Primary 1 Transition",
                  author: "Anonymous Parent",
                  replies: 24,
                  likes: 18,
                  timeAgo: "2h ago",
                  isPinned: true,
                  category: "General",
                },
                {
                  title: "English Reading Help Needed",
                  author: "Sarah_HK",
                  replies: 12,
                  likes: 8,
                  timeAgo: "4h ago",
                  isPinned: false,
                  category: "Assignment Help",
                },
                {
                  title: "Homework Motivation Strategies",
                  author: "TeacherVolunteer",
                  replies: 31,
                  likes: 45,
                  timeAgo: "6h ago",
                  isPinned: false,
                  category: "Tips & Strategies",
                  isVolunteer: true,
                },
              ].map((discussion, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-gray-900 flex-1 leading-tight">{discussion.title}</h3>
                        {discussion.isPinned && <Pin className="w-4 h-4 text-orange-600 flex-shrink-0 ml-2" />}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{discussion.author}</span>
                        {discussion.isVolunteer && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            Volunteer
                          </Badge>
                        )}
                        <span>•</span>
                        <span>{discussion.timeAgo}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {discussion.category}
                        </Badge>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{discussion.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{discussion.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Shared Resources</h2>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>

            <div className="space-y-3">
              {sharedResources.map((resource) => (
                <Card key={resource.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-gray-900 flex-1">{resource.title}</h3>
                        <Badge variant="secondary" className="ml-2">
                          {resource.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>By {resource.author}</span>
                        <span>•</span>
                        <span>⭐ {resource.rating}</span>
                        <span>•</span>
                        <span>{resource.downloads} downloads</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {resource.category}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === "groups" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Practice Groups</h2>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-1" />
                Create
              </Button>
            </div>

            <div className="space-y-3">
              {practiceGroups.map((group) => (
                <Card key={group.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{group.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{group.description}</p>
                        </div>
                        <Badge variant="secondary">{group.level}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{group.members} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{group.nextSession}</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                        Join Group (+25 pts)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
