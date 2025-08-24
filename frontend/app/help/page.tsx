"use client";

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { useFontSize } from "@/app/font-size-provider"
import {
  Users,
  Clock,
  Star,
  MessageCircle,
  Video,
} from "lucide-react"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"

// Mock data for volunteers with Time Auction integration (localized)
const volunteersEn = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Former K3 Teacher",
    avatar: "👩‍🏫",
    likes: 2450,
    hoursContributed: 42,
    timeAuctionBadge: "Gold Mentor",
    badgeColor: "bg-yellow-100 text-yellow-700",
    totalAnswers: 156,
    isOnline: true,
    specialties: ["Phonics", "Reading"],
  },
  {
    id: 2,
    name: "David Wong",
    role: "Parent of 3",
    avatar: "👨‍👨‍👧‍👦",
    likes: 1800,
    hoursContributed: 28,
    timeAuctionBadge: "Silver Helper",
    badgeColor: "bg-gray-100 text-gray-700",
    totalAnswers: 89,
    isOnline: false,
    specialties: ["Homework Help", "Motivation"],
  },
  {
    id: 3,
    name: "Ms. Liu",
    role: "Child Psychologist",
    avatar: "👩‍⚕️",
    likes: 2200,
    hoursContributed: 65,
    timeAuctionBadge: "Platinum Expert",
    badgeColor: "bg-purple-100 text-purple-700",
    totalAnswers: 203,
    isOnline: true,
    specialties: ["Learning Difficulties", "Development"],
  },
];

const volunteersZh = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "前 K3 老師",
    avatar: "👩‍🏫",
    likes: 2450,
    hoursContributed: 42,
    timeAuctionBadge: "金級導師",
    badgeColor: "bg-yellow-100 text-yellow-700",
    totalAnswers: 156,
    isOnline: true,
    specialties: ["自然拼讀", "閱讀"],
  },
  {
    id: 2,
    name: "David Wong",
    role: "三孩家長",
    avatar: "👨‍👨‍👧‍👦",
    likes: 1800,
    hoursContributed: 28,
    timeAuctionBadge: "銀級幫手",
    badgeColor: "bg-gray-100 text-gray-700",
    totalAnswers: 89,
    isOnline: false,
    specialties: ["功課協助", "學習動機"],
  },
  {
    id: 3,
    name: "Ms. Liu",
    role: "兒童心理學家",
    avatar: "👩‍⚕️",
    likes: 2200,
    hoursContributed: 65,
    timeAuctionBadge: "白金專家",
    badgeColor: "bg-purple-100 text-purple-700",
    totalAnswers: 203,
    isOnline: true,
    specialties: ["學習困難", "發展"],
  },
];




// Mock user's volunteer progress (if they're a volunteer)
const myProgress = {
  hoursThisMonth: 12,
  hoursGoal: 20,
  totalHours: 67,
  rank: 5,
  rewardsAvailable: 3,
  nextReward: "Free REACH Workshop",
};

export default function VolunteerPage() {
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const { isLarge } = useFontSize()
  const isZh = i18n.language?.startsWith('zh')
  const volunteersData = isZh ? volunteersZh : volunteersEn
  const [search, setSearch] = useState("");
  // Track likes and liked state per volunteer
  const [volunteers, setVolunteers] = useState(
    volunteersData.map(v => ({ ...v, liked: false }))
  )

  // Update volunteers when language changes
  useEffect(() => {
    setVolunteers(volunteersData.map(v => ({ ...v, liked: false })))
  }, [isZh])

  // Like handler
  const handleLike = useCallback((id: number) => {
    setVolunteers(vols =>
      vols.map(v =>
        v.id === id && !v.liked
          ? { ...v, likes: v.likes + 1, liked: true }
          : v
      )
    )
  }, [])

  return (
    <div
      className={`min-h-screen bg-gray-50 ${
        isLarge ? "min-text-lg text-lg" : ""
      }`}
    >
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Volunteers list */}
        <div className="space-y-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-6 h-6 stroke-2 z-10 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/></svg>
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('volunteer.volunteers.search') || "Search volunteers..."}
              className="pl-12 duolingo-card border-0 shadow-lg w-full py-3"
            />
          </div>

          <div className="space-y-3">
            {volunteers
              .filter(volunteer => 
                volunteer.name.toLowerCase().includes(search.toLowerCase()) ||
                volunteer.role.toLowerCase().includes(search.toLowerCase()) ||
                volunteer.specialties.some(specialty => specialty.toLowerCase().includes(search.toLowerCase()))
              )
              .map((volunteer) => (
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
                          <button
                            type="button"
                            aria-label={volunteer.liked ? t('volunteer.volunteers.liked') : t('volunteer.volunteers.like')}
                            onClick={() => handleLike(volunteer.id)}
                            disabled={volunteer.liked}
                            className={`p-1 rounded-full transition-colors ${
                              volunteer.liked ? "bg-red-100" : "hover:bg-gray-100"
                            }`}
                          >
                            <Heart
                              className="w-4 h-4"
                              fill={volunteer.liked ? "#EF4444" : "none"}
                              stroke="#EF4444"
                            />
                          </button>
                          <span className="text-sm font-medium text-gray-700">{volunteer.likes}</span>
                          <span className="text-sm text-gray-500">• {volunteer.totalAnswers} {t('volunteer.volunteers.answers')}</span>
                        </div>
                      </div>
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

                    {/* Action Buttons: call & video next to message */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
                        disabled={!volunteer.isOnline}
                      >
                        <MessageCircle className="w-4 h-4 mr-2 stroke-2" />
                        {volunteer.isOnline ? t('volunteer.volunteers.answerQuestions') : t('volunteer.volunteers.offline')}
                      </Button>
                      <Button 
                        variant="outline"
                        className="px-3 border-gray-200"
                        disabled={!volunteer.isOnline}
                        aria-label="Call"
                      >
                        <Users className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline"
                        className="px-3 border-gray-200"
                        disabled={!volunteer.isOnline}
                        aria-label="Video"
                      >
                        <Video className="w-4 h-4" />
                      </Button>
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
  );
}
