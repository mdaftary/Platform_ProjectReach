"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star, MessageCircle, HandHeart, Users, Trophy } from "lucide-react"

export default function VolunteerPage() {
  return (
    <div className="p-4 space-y-6">
      <div className="text-center space-y-4">
        <HandHeart className="w-12 h-12 text-orange-600 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-800">Volunteer Program</h1>
        <p className="text-gray-600">Connect with volunteers who can help with assignments</p>

        <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6">
          <HandHeart className="w-6 h-6 mr-3" />
          Be a Volunteer
        </Button>
      </div>

      {/* Available Volunteers */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">Available Volunteers</h2>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">JL</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Jennifer L.</h3>
                <p className="text-sm text-gray-600">English Teacher • 5 years experience</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
              </div>
            </div>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">MW</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Michael W.</h3>
                <p className="text-sm text-gray-600">Parent Volunteer • Alphabet Time specialist</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.7</span>
                  </div>
                  <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                    <Clock className="w-3 h-3 mr-1" />
                    Available in 30min
                  </Badge>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 bg-transparent">
              Schedule
            </Button>
          </div>
        </Card>
      </div>

      {/* How It Works */}
      <Card className="p-6 bg-orange-50 border-orange-200">
        <h3 className="font-bold text-orange-800 mb-4">How Volunteering Works</h3>
        <div className="space-y-3 text-sm text-orange-700">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center text-xs font-bold">
              1
            </div>
            <p>Sign up as a volunteer and set your availability</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center text-xs font-bold">
              2
            </div>
            <p>Help parents with questions and assignment guidance</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center text-xs font-bold">
              3
            </div>
            <p>Earn volunteer credits and help build the community</p>
          </div>
        </div>
      </Card>

      {/* Volunteer Benefits */}
      <Card className="p-6 bg-green-50 border-green-200">
        <div className="text-center space-y-3">
          <Trophy className="w-8 h-8 text-green-600 mx-auto" />
          <h3 className="font-bold text-green-800">Volunteer Benefits</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-green-700">
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto mb-1" />
              <p>Build Community</p>
            </div>
            <div className="text-center">
              <Star className="w-6 h-6 mx-auto mb-1" />
              <p>Earn Recognition</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
