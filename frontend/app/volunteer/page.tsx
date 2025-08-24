"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFontSize } from "@/app/font-size-provider";
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
  User,
  Settings,
  BarChart3,
  LogOut,
} from "lucide-react";
import "@/lib/i18n";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import LanguageSwitcher from "@/components/language-switcher"; // Add this import
import { SwipeableVolunteerImpactCard } from "@/components/swipeable-volunteer-impact-card"

// Mock data for volunteers with Time Auction integration (localized)
const volunteersEn = [
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
    specialties: ["Phonics", "Reading"],
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
    specialties: ["Homework Help", "Motivation"],
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
    specialties: ["Learning Difficulties", "Development"],
  },
];

const volunteersZh = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "前 K3 老師",
    avatar: "👩‍🏫",
    rating: 4.9,
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
    rating: 4.8,
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
    rating: 5.0,
    hoursContributed: 65,
    timeAuctionBadge: "白金專家",
    badgeColor: "bg-purple-100 text-purple-700",
    totalAnswers: 203,
    isOnline: true,
    specialties: ["學習困難", "發展"],
  },
];

// Mock recent questions (localized)
const recentQuestionsEn = [
  {
    id: 1,
    question: "My 5-year-old struggles with letter 'b' and 'd' - any tips?",
    author: "Anonymous Parent",
    timeAgo: "2 hours ago",
    answers: 3,
    isAnswered: true,
    category: "Phonics",
  },
  {
    id: 2,
    question: "How to motivate reluctant reader for daily practice?",
    author: "Worried Mom",
    timeAgo: "5 hours ago",
    answers: 7,
    isAnswered: true,
    category: "Motivation",
  },
  {
    id: 3,
    question: "Best apps for sight word practice at home?",
    author: "Tech Dad",
    timeAgo: "1 day ago",
    answers: 12,
    isAnswered: true,
    category: "Resources",
  },
];

const recentQuestionsZh = [
  {
    id: 1,
    question: "我家 5 歲孩子分不清 b 與 d，有什麼技巧？",
    author: "匿名家長",
    timeAgo: "2 小時前",
    answers: 3,
    isAnswered: true,
    category: "自然拼讀",
  },
  {
    id: 2,
    question: "如何激勵不太想閱讀的孩子每天練習？",
    author: "擔心的媽媽",
    timeAgo: "5 小時前",
    answers: 7,
    isAnswered: true,
    category: "動機",
  },
  {
    id: 3,
    question: "有哪些適合在家練習常見詞的 App？",
    author: "科技爸爸",
    timeAgo: "1 天前",
    answers: 12,
    isAnswered: true,
    category: "資源",
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
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("General");
  const { isLarge } = useFontSize();
  const isZh = i18n.language?.startsWith("zh");
  const volunteers = isZh ? volunteersZh : volunteersEn;
  const recentQuestions = isZh ? recentQuestionsZh : recentQuestionsEn;
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div
      className={`min-h-screen bg-gray-50 ${
        isLarge ? "min-text-lg text-lg" : ""
      }`}
    >
      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Swipeable volunteer impact card */}
        <SwipeableVolunteerImpactCard impact={myProgress} />

        {/* My Impact section moved into swipeable card */}

        {/* Recent Questions */}
        <div className="space-y-4">
          <h2
            className={`${
              isLarge ? "text-2xl" : "text-lg"
            } font-semibold text-gray-900`}
          >
            {t("volunteer.recent.title")}
          </h2>

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
                        <h3 className="font-medium text-gray-900 leading-tight">
                          {q.question}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <span>{q.author}</span>
                          <span>•</span>
                          <span>{q.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-blue-200 text-blue-600"
                        >
                          {q.category}
                        </Badge>
                        {q.isAnswered && (
                          <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1 stroke-2" />
                            {t("volunteer.recent.answered")}
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
  );
}