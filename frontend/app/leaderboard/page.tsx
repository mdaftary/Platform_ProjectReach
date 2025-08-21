"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingUp, Star, Medal } from "lucide-react"

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-orange-600" />
            Leaderboard
          </h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            variant={activeTab === "overall" ? "default" : "ghost"}
            className={`flex-1 ${activeTab === "overall" ? "bg-orange-600 hover:bg-orange-700" : ""}`}
            onClick={() => setActiveTab("overall")}
          >
            <Star className="w-4 h-4 mr-2" />
            Top Points
          </Button>
          <Button
            variant={activeTab === "improved" ? "default" : "ghost"}
            className={`flex-1 ${activeTab === "improved" ? "bg-orange-600 hover:bg-orange-700" : ""}`}
            onClick={() => setActiveTab("improved")}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Most Improved
          </Button>
        </div>

        {/* Overall Leaderboard */}
        {activeTab === "overall" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Performers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboardData.map((user) => (
                  <div key={user.rank} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-gray-200">
                      {user.rank <= 3 ? (
                        <Medal className={`w-5 h-5 ${getBadgeColor(user.badge)} text-white rounded-full p-1`} />
                      ) : (
                        <span className="text-sm font-bold text-gray-600">#{user.rank}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.streak} day streak</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">{user.points}</p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Your Rank */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-600 text-white">
                    <span className="text-sm font-bold">#12</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">You</p>
                    <p className="text-sm text-gray-500">5 day streak</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">1250</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Most Improved */}
        {activeTab === "improved" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Most Improved This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mostImprovedData.map((user) => (
                  <div key={user.rank} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.period}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{user.improvement}</p>
                      <Badge variant="secondary" className="text-xs">
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
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How to Earn Points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Submit assignment</span>
              <Badge variant="secondary">+50 pts</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Help in discussions</span>
              <Badge variant="secondary">+75 pts</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Join practice group</span>
              <Badge variant="secondary">+25 pts</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Daily login streak</span>
              <Badge variant="secondary">+10 pts</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
