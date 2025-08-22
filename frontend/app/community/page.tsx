"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useFontSize } from "@/app/font-size-provider"
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
import "@/lib/i18n"
import { useTranslation } from "react-i18next"

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
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("discussions")
  const { isLarge } = useFontSize()

  const tabs = [
    { id: "discussions", label: t('community.page.tabs.discussions'), icon: MessageSquare },
    { id: "resources", label: t('community.page.tabs.resources'), icon: Share2 },
    { id: "groups", label: t('community.page.tabs.groups'), icon: Users },
  ]

  return (
    <div className={`min-h-screen bg-background ${isLarge ? 'min-text-lg text-lg' : ''}`}>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('community.page.title')}</h1>
          <p className="text-muted-foreground">{t('community.page.subtitle')}</p>
        </div>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder={t('community.page.search')} className="pl-10 duolingo-card border-0 shadow-lg" />
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 gap-3">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`flex items-center gap-2 duolingo-button py-3 ${
                activeTab === tab.id 
                  ? "duolingo-gradient-primary border-0 text-white shadow-lg" 
                  : "border-gray-300 text-foreground bg-card hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {!isLarge && <tab.icon className="w-4 h-4" />}
              <span className="text-sm font-medium">{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Discussions Tab */}
        {activeTab === "discussions" && (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h2 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold text-foreground`}>{t('community.page.discussions.recent')}</h2>
              <Button size="sm" className="duolingo-button duolingo-gradient-primary border-0 text-white font-semibold">
                {!isLarge && <Plus className="w-4 h-4 mr-1" />}
                {t('community.page.discussions.newPost')}
              </Button>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Tips for K3 to Primary 1 Transition",
                  author: "Anonymous Parent",
                  authorRole: "Parent",
                  replies: 24,
                  likes: 18,
                  timeAgo: "2h ago",
                  isPinned: true,
                  category: "General",
                  recentReplies: [
                    { author: "Sarah M.", role: "Parent", text: "We use bedtime reading — 10 min daily worked wonders for sight words." },
                    { author: "Ms. Chen", role: "Teacher", text: "Try flashcards with pictures! Make it a game..." }
                  ]
                },
                {
                  title: "English Reading Help Needed",
                  author: "Sarah_HK",
                  authorRole: "Parent",
                  replies: 12,
                  likes: 8,
                  timeAgo: "4h ago",
                  isPinned: false,
                  category: "Assignment Help",
                  recentReplies: [
                    { author: "David L.", role: "Volunteer", text: "What specific reading challenges is your child facing?" },
                    { author: "Emma K.", role: "Parent", text: "My daughter had similar issues. Here's what helped..." }
                  ]
                },
                {
                  title: "Homework Motivation Strategies",
                  author: "TeacherVolunteer",
                  authorRole: "Volunteer",
                  replies: 31,
                  likes: 45,
                  timeAgo: "6h ago",
                  isPinned: false,
                  category: "Tips & Strategies",
                  isVolunteer: true,
                  recentReplies: [
                    { author: "Lisa M.", role: "Parent", text: "The reward chart idea worked perfectly for us!" },
                    { author: "Mr. Wong", role: "Teacher", text: "I always recommend breaking tasks into smaller chunks." }
                  ]
                },
              ].map((discussion, index) => (
                <Card key={index} className="duolingo-card border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-foreground flex-1 leading-tight">{discussion.title}</h3>
                        {discussion.isPinned && <Pin className="w-4 h-4 text-primary flex-shrink-0 ml-2" />}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{discussion.author}</span>
                        <Badge className={`text-xs px-2 py-0.5 ${
                          discussion.authorRole === 'Teacher' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                          discussion.authorRole === 'Volunteer' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                          discussion.authorRole === 'Staff' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          'bg-green-100 text-green-700 border-green-200'
                        }`}>
                          {discussion.authorRole}
                        </Badge>
                        <span>•</span>
                        <span>{discussion.timeAgo}</span>
                      </div>

                      {/* Recent Replies Preview */}
                      {!isLarge && discussion.recentReplies && discussion.recentReplies.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          <div className="text-xs font-medium text-gray-600 mb-2">{t('community.page.discussions.latestReplies')}</div>
                          {discussion.recentReplies.slice(0, 2).map((reply, replyIndex) => (
                            <div key={replyIndex} className="flex items-start gap-2">
                              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="text-xs font-medium text-gray-700">{reply.author}</span>
                                  <Badge className={`text-xs px-1.5 py-0.5 ${
                                    reply.role === 'Teacher' ? 'bg-purple-100 text-purple-600' :
                                    reply.role === 'Volunteer' ? 'bg-orange-100 text-orange-600' :
                                    'bg-green-100 text-green-600'
                                  }`}>
                                    {reply.role}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed truncate">{reply.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                          {discussion.category}
                        </Badge>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{discussion.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{discussion.likes}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="text-green-700 border-green-400 hover:bg-green-100">
                            {t('community.page.discussions.follow')}
                          </Button>
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
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h2 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold text-foreground`}>{t('community.page.resources.title')}</h2>
              <Button size="sm" className="duolingo-button duolingo-gradient-primary border-0 text-white font-semibold">
                {!isLarge && <Plus className="w-4 h-4 mr-1" />}
                {t('community.page.resources.share')}
              </Button>
            </div>

            <div className="space-y-4">
              {sharedResources.map((resource) => (
                <Card key={resource.id} className="duolingo-card border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        {/* File Preview Thumbnail */}
                        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <div className="text-green-600 font-bold text-xs text-center">
                            {resource.type}
                            <br />
                            <div className="text-xs opacity-75">{t('community.page.resources.preview')}</div>
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-foreground flex-1 leading-tight">{resource.title}</h3>
                          </div>
                          
                          <div className={`flex ${isLarge ? 'flex-col items-start gap-1' : 'items-center gap-2'} text-sm text-muted-foreground`}>
                            <span>{t('community.page.resources.by')} {resource.author}</span>
                            {!isLarge && <span>•</span>}
                            <span>⭐ {resource.rating}</span>
                            {!isLarge && <span>•</span>}
                            <span>{resource.downloads} {t('community.page.resources.download')}</span>
                          </div>
                          
                          {/* File Details */}
                          <div className={`flex ${isLarge ? 'flex-col items-start gap-1' : 'items-center gap-2'}`}>
                            <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                              {resource.category}
                            </Badge>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {resource.type} • {Math.floor(Math.random() * 3 + 1)}.{Math.floor(Math.random() * 9)}MB
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          {!isLarge && (
                            <Button variant="outline" size="sm" className="text-gray-800 border-gray-300 hover:bg-gray-100">
                              {t('community.page.resources.preview')}
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="text-blue-700 border-blue-400 hover:bg-blue-100">
                            {!isLarge && <Heart className="w-3 h-3 mr-1 stroke-2" />}
                            {t('community.page.resources.favourite')}
                          </Button>
                        </div>
                        
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white border-0 rounded-xl px-4 py-2 font-semibold shadow-sm">
                          {!isLarge && <Download className="w-4 h-4 mr-2 stroke-2" />}
                          {t('community.page.resources.download')}
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
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h2 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold text-foreground`}>{t('community.page.groups.title')}</h2>
              <Button size="sm" className="duolingo-button duolingo-gradient-primary border-0 text-white font-semibold">
                {!isLarge && <Plus className="w-4 h-4 mr-1" />}
                {t('community.page.groups.create')}
              </Button>
            </div>

            <div className="space-y-4">
              {practiceGroups.map((group) => (
                <Card key={group.id} className="duolingo-card border-0 shadow-lg cursor-pointer">
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{group.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                        </div>
                        <Badge className="duolingo-gradient-light text-primary border-0">{group.level}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{group.members} {t('community.page.groups.members')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{group.nextSession}</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full duolingo-button duolingo-gradient-primary border-0 text-white font-semibold">
                        {t('community.page.groups.join')}
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
