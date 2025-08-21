"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingUp, Star, Medal } from "lucide-react"
import { useFontSize } from "@/app/font-size-provider"

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
  const [activeTab, setActiveTab] = useState<"overall" | "improved">("overall")
  const { isLarge } = useFontSize()

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
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank among other learners</p>
        </div>
        {/* Tab Navigation */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={activeTab === "overall" ? "default" : "outline"}
            className={`duolingo-button py-3 ${
              activeTab === "overall" 
                ? "duolingo-gradient-primary border-0 text-white shadow-lg" 
                : "border-border bg-card hover:bg-accent/50"
            }`}
            onClick={() => setActiveTab("overall")}
          >
            {!isLarge && <Star className="w-4 h-4 mr-2" />}
            Top Points
          </Button>
          <Button
            variant={activeTab === "improved" ? "default" : "outline"}
            className={`duolingo-button py-3 ${
              activeTab === "improved" 
                ? "duolingo-gradient-primary border-0 text-white shadow-lg" 
                : "border-border bg-card hover:bg-accent/50"
            }`}
            onClick={() => setActiveTab("improved")}
          >
            {!isLarge && <TrendingUp className="w-4 h-4 mr-2" />}
            Most Improved
          </Button>
        </div>

        {/* Overall Leaderboard */}
        {activeTab === "overall" && (
          <div className="space-y-5">
            <Card className="duolingo-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Top Performers</CardTitle>
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
                      <p className="text-sm text-muted-foreground">{user.streak} day streak</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-lg">{user.points}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Your Rank */}
            <Card className="duolingo-card border-0 shadow-lg overflow-hidden">
              <div className="duolingo-gradient-light p-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full duolingo-gradient-primary text-white shadow-lg">
                    <span className="text-sm font-bold">#12</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary">You</p>
                    <p className="text-sm text-primary/70">5 day streak</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-lg">1250</p>
                    <p className="text-xs text-primary/70">points</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Most Improved */}
        {activeTab === "improved" && (
          <div className="space-y-5">
            <Card className="duolingo-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Most Improved This Week</CardTitle>
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
                        Rising
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Point System Info */}
        <Card className="duolingo-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">How to Earn Points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium text-foreground">Submit assignment</span>
              <Badge className="duolingo-gradient-success text-white border-0">+50 pts</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium text-foreground">Help in discussions</span>
              <Badge className="duolingo-gradient-success text-white border-0">+75 pts</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium text-foreground">Join practice group</span>
              <Badge className="duolingo-gradient-success text-white border-0">+25 pts</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium text-foreground">Daily login streak</span>
              <Badge className="duolingo-gradient-success text-white border-0">+10 pts</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
