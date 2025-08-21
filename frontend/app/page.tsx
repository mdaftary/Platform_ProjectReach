"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CheckCircle, Clock, Star, Flame } from "lucide-react"
import Link from "next/link"

const englishClasses = [
  {
    id: "alphabet",
    title: "Alphabet Time",
    subtitle: "齊來學英文字母!",
    module: "Module 1: ABCDEF",
    booklet: "Booklet 1",
    progress: 75,
    color: "bg-gradient-to-br from-orange-400 to-yellow-400",
    image: "/colorful-abc-bird.png",
    assignments: 3,
    completed: 2,
  },
  {
    id: "vocabulary",
    title: "Vocabulary Time",
    subtitle: "齊來學詞彙!",
    module: "Module 4: Fruits",
    booklet: "Booklet 2",
    progress: 60,
    color: "bg-gradient-to-br from-green-400 to-emerald-400",
    image: "/happy-book-character-fruits.png",
    assignments: 4,
    completed: 2,
  },
  {
    id: "sight-words",
    title: "Sight Words Time",
    subtitle: "齊來學高頻字詞!",
    module: "Module 1: Colours",
    booklet: "Booklet 3",
    progress: 90,
    color: "bg-gradient-to-br from-red-400 to-orange-400",
    image: "/cute-bee-sight-words.png",
    assignments: 2,
    completed: 2,
  },
  {
    id: "reading",
    title: "Reading Time",
    subtitle: "齊來閱讀!",
    module: "Module 1: Colours",
    booklet: "Booklet 4",
    progress: 45,
    color: "bg-gradient-to-br from-green-400 to-lime-400",
    image: "/bookworm-reading.png",
    assignments: 5,
    completed: 2,
  },
]

export default function HomePage() {
  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, Emma!</h1>
        <p className="text-gray-600">Let's continue your English learning journey</p>
      </div>

      <div className="flex gap-3 -mx-4">
        <Card className="flex-1 overflow-hidden">
          <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 p-6 text-white">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="p-2 bg-white/20 rounded-full">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold">1,250</span>
            </div>
            <p className="text-center text-sm font-medium opacity-90">Total Points</p>
          </div>
        </Card>

        <Card className="flex-1 overflow-hidden">
          <div className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-500 p-6 text-white">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="p-2 bg-white/20 rounded-full">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold">5</span>
            </div>
            <p className="text-center text-sm font-medium opacity-90">Day Streak</p>
          </div>
        </Card>
      </div>

      {/* English Learning Classes */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Your English Classes</h2>

        <div className="grid grid-cols-2 gap-3">
          {englishClasses.map((classItem) => (
            <Card key={classItem.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-24 overflow-hidden">
                <img
                  src={classItem.image || "/placeholder.svg"}
                  alt={classItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <h3 className="font-bold text-white text-sm leading-tight">{classItem.title}</h3>
                  <p className="text-white/90 text-xs">{classItem.subtitle}</p>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{classItem.module}</p>
                    <p className="text-xs text-gray-500">{classItem.booklet}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{classItem.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${classItem.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {classItem.completed}/{classItem.assignments} done
                      </span>
                    </div>
                    {classItem.completed < classItem.assignments && (
                      <Badge variant="destructive" className="text-xs">
                        {classItem.assignments - classItem.completed} pending
                      </Badge>
                    )}
                  </div>

                  <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                    <Link href={`/assignments?class=${classItem.id}`}>Continue</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <div className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Sight Words completed</p>
                  <p className="text-sm text-gray-500">2 hours ago • +50 points</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Alphabet Time due tomorrow</p>
                  <p className="text-sm text-gray-500">Don't forget to submit!</p>
                </div>
                <Button size="sm" variant="outline">
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
