"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingUp, Star, Medal, EyeOff, Eye, Flame, Clock } from "lucide-react"
import { useFontSize } from "@/app/font-size-provider"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"

const leaderboardData = [
  { rank: 1, name: "Parent A", points: 2450, streak: 15, badge: "gold" },
  { rank: 2, name: "Parent B", points: 2380, streak: 12, badge: "silver" },
  { rank: 3, name: "Parent C", points: 2250, streak: 8, badge: "bronze" },
  { rank: 4, name: "Parent D", points: 2100, streak: 10, badge: null },
  { rank: 5, name: "Parent E", points: 1950, streak: 6, badge: null },
]

const mostImprovedData = [
  { rank: 1, name: "Parent F", improvement: "+450 pts", period: "This week" },
  { rank: 2, name: "Parent G", improvement: "+380 pts", period: "This week" },
  { rank: 3, name: "Parent H", improvement: "+320 pts", period: "This week" },
]

export default function LeaderboardPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<"overall" | "improved">("overall")
  const { isLarge } = useFontSize()
  const [optedOut, setOptedOut] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("leaderboard-opt-out")
      setOptedOut(stored === "true")
    } catch {}
  }, [])

  const handleOptOut = () => {
    try {
      localStorage.setItem("leaderboard-opt-out", "true")
    } catch {}
    setOptedOut(true)
  }

  const handleOptIn = () => {
    try {
      localStorage.setItem("leaderboard-opt-out", "false")
    } catch {}
    setOptedOut(false)
  }

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case "gold":
        return "bg-yellow-500"
      case "silver":
        return "bg-gray-400"
      case "bronze":
        return "bg-orange-600"
      default:
        return "bg-gray-200"
    }
  }

  return (
    <div className={`min-h-screen bg-background ${isLarge ? 'min-text-lg text-lg' : ''}`}>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* User Badge - Center Top */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <span className="text-lg font-bold text-white">{optedOut ? "?" : "#12"}</span>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('leaderboard.title')}</h1>
        </div>

        {/* Personal Stats */}
        <div className={`flex ${isLarge ? 'flex-col gap-3' : 'justify-between items-center gap-4'} mb-6`}>
          <div className="duolingo-gradient-light rounded-2xl p-4 shadow-sm flex-1">
            <div className={`flex items-center ${isLarge ? 'gap-4' : 'gap-3'}`}>
              <div className={`${isLarge ? 'w-12 h-12' : 'w-10 h-10'} rounded-full duolingo-gradient-primary flex items-center justify-center shadow`}>
                <Flame className={`${isLarge ? 'w-6 h-6' : 'w-5 h-5'} text-white`} />
              </div>
              <div className="flex-1">
                <div className={`${isLarge ? 'text-3xl' : 'text-2xl'} font-extrabold text-gray-900 tabular-nums`}>12</div>
                <div className={`${isLarge ? 'text-sm' : 'text-xs'} text-gray-700 mt-0.5`}>{t('home.daysStreak')}</div>
              </div>
            </div>
          </div>

          <div className="duolingo-gradient-light rounded-2xl p-4 shadow-sm flex-1">
            <div className={`flex items-center ${isLarge ? 'gap-4' : 'gap-3'}`}>
              <div className={`${isLarge ? 'w-12 h-12' : 'w-10 h-10'} rounded-full duolingo-gradient-success flex items-center justify-center shadow`}>
                <Clock className={`${isLarge ? 'w-6 h-6' : 'w-5 h-5'} text-white`} />
              </div>
              <div className="flex-1">
                <div className={`${isLarge ? 'text-3xl' : 'text-2xl'} font-extrabold text-gray-900 tabular-nums`}>2.5h</div>
                <div className={`${isLarge ? 'text-sm' : 'text-xs'} text-gray-700 mt-0.5`}>{t('home.activityHours')}</div>
              </div>
            </div>
          </div>

          <div className="duolingo-gradient-light rounded-2xl p-4 shadow-sm flex-1">
            <div className={`flex items-center ${isLarge ? 'gap-4' : 'gap-3'}`}>
              <div className={`${isLarge ? 'w-12 h-12' : 'w-10 h-10'} rounded-full duolingo-gradient-primary flex items-center justify-center shadow`}>
                <Star className={`${isLarge ? 'w-6 h-6' : 'w-5 h-5'} text-white`} />
              </div>
              <div className="flex-1">
                <div className={`${isLarge ? 'text-3xl' : 'text-2xl'} font-extrabold text-gray-900 tabular-nums`}>847</div>
                <div className={`${isLarge ? 'text-sm' : 'text-xs'} text-gray-700 mt-0.5`}>{t('home.starsEarned')}</div>
              </div>
            </div>
          </div>
        </div>
        {optedOut && (
          <Card className="duolingo-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">{t('leaderboard.hiddenTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t('leaderboard.hiddenDesc')}</p>
            </CardContent>
          </Card>
        )}

        {/* Tab Navigation */}
        {!optedOut && (
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={activeTab === "overall" ? "default" : "outline"}
            className={`duolingo-button ${isLarge ? 'py-4 text-base' : 'py-3'} ${
              activeTab === "overall" 
                ? "duolingo-gradient-primary border-0 text-white shadow-lg" 
                : "border-border bg-card hover:bg-accent/50"
            }`}
            onClick={() => setActiveTab("overall")}
          >
            {!isLarge && <Star className="w-4 h-4 mr-2" />}
            {t('leaderboard.tabs.overall')}
          </Button>
          <Button
            variant={activeTab === "improved" ? "default" : "outline"}
            className={`duolingo-button ${isLarge ? 'py-4 text-base' : 'py-3'} ${
              activeTab === "improved" 
                ? "duolingo-gradient-primary border-0 text-white shadow-lg" 
                : "border-border bg-card hover:bg-accent/50"
            }`}
            onClick={() => setActiveTab("improved")}
          >
            {!isLarge && <TrendingUp className="w-4 h-4 mr-2" />}
            {t('leaderboard.tabs.improved')}
          </Button>
        </div>
        )}

        {/* Overall Leaderboard */}
        {!optedOut && activeTab === "overall" && (
          <div className="space-y-5">
            {/* Your Rank - Moved to Top */}
            <Card className="duolingo-card border-0 shadow-lg overflow-hidden">
              <div className="duolingo-gradient-light p-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full duolingo-gradient-primary text-white shadow-lg">
                    <span className="text-sm font-bold">{optedOut ? "?" : "#12"}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary">{t('leaderboard.overall.you')}</p>
                    <p className="text-sm text-primary/70">5 {t('leaderboard.overall.dayStreak')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-lg">1250</p>
                    <p className="text-xs text-primary/70">{t('leaderboard.overall.points')}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="duolingo-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold text-foreground`}>{t('leaderboard.overall.topPerformers')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboardData.map((user) => (
                  <div key={user.rank} className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-card border-2 border-border shadow-sm">
                      {user.rank <= 3 ? (
                        <Medal className={`w-6 h-6 ${getBadgeColor(user.badge)} text-white rounded-full p-1`} />
                      ) : (
                        <span className="text-sm font-bold text-muted-foreground">#{user.rank}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.streak} {t('leaderboard.overall.dayStreak')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-lg">{user.points}</p>
                      <p className="text-xs text-muted-foreground">{t('leaderboard.overall.points')}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Most Improved */}
        {!optedOut && activeTab === "improved" && (
          <div className="space-y-5">
            {/* Your Improvement - Moved to Top */}
            <Card className="duolingo-card border-0 shadow-lg overflow-hidden">
              <div className="duolingo-gradient-light p-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full duolingo-gradient-success text-white shadow-lg">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary">{t('leaderboard.overall.you')}</p>
                    <p className="text-sm text-primary/70">+75 pts this week</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-lg">{optedOut ? "?" : "#8"}</p>
                    <p className="text-xs text-primary/70">This Week</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="duolingo-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold text-foreground`}>{t('leaderboard.improved.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mostImprovedData.map((user) => (
                  <div key={user.rank} className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full duolingo-gradient-success text-white shadow-lg">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.period}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-lg">{user.improvement}</p>
                      <Badge className="text-xs duolingo-gradient-success text-white border-0">
                        {t('leaderboard.improved.rising')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Point System Info */}
        {!optedOut && (
        <Card className="duolingo-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold text-foreground`}>{t('leaderboard.pointsInfo.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium text-foreground">{t('leaderboard.pointsInfo.submit')}</span>
              <Badge className="duolingo-gradient-success text-white border-0">{t('leaderboard.pointsInfo.plus50')}</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium text-foreground">{t('leaderboard.pointsInfo.help')}</span>
              <Badge className="duolingo-gradient-success text-white border-0">{t('leaderboard.pointsInfo.plus75')}</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium text-foreground">{t('leaderboard.pointsInfo.join')}</span>
              <Badge className="duolingo-gradient-success text-white border-0">{t('leaderboard.pointsInfo.plus25')}</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium text-foreground">{t('leaderboard.pointsInfo.streak')}</span>
              <Badge className="duolingo-gradient-success text-white border-0">{t('leaderboard.pointsInfo.plus10')}</Badge>
            </div>
          </CardContent>
        </Card>
        )}

        {/* Opt-out / Opt-in Control */}
        <div className="flex w-full">
          {!optedOut ? (
            <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100 w-full" onClick={handleOptOut}>
              {!isLarge && <EyeOff className="w-4 h-4 mr-2" />}
              {t('leaderboard.optOut')}
            </Button>
          ) : (
            <Button className="duolingo-gradient-primary border-0 text-white shadow-lg w-full" onClick={handleOptIn}>
              {!isLarge && <Eye className="w-4 h-4 mr-2" />}
              {t('leaderboard.optIn')}
            </Button>
          )}
        </div>
      </div>
      
    </div>
  )
}
