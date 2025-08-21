"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft, 
  Bookmark, 
  Heart, 
  MessageCircle, 
  Share, 
  Send,
  User
} from "lucide-react"
import Link from "next/link"

// Mock data for the discussion post
const discussionPost = {
  id: 1,
  title: "Tips for K3 to Primary 1 Transition",
  author: "Anonymous Parent",
  authorRole: "Parent",
  timestamp: "2 hours ago",
  content: "My child is moving to Primary 1 next year, and I'm worried about English readiness. How do you practice sight words at home? Any specific activities or games that worked well for your children?",
  tags: ["General", "Transition"],
  engagement: {
    likes: 12,
    replies: 8,
    shares: 3
  },
  isLiked: false,
  isBookmarked: false
}

// Mock replies data
const replies = [
  {
    id: 1,
    author: "Sarah M.",
    authorRole: "Parent",
    timestamp: "1 hour ago",
    content: "We use bedtime reading — 10 min daily worked wonders for sight words. My daughter went from recognizing 5 words to 30+ in just 2 months!",
    likes: 8,
    isLiked: true
  },
  {
    id: 2,
    author: "Ms. Chen",
    authorRole: "Teacher",
    timestamp: "45 min ago",
    content: "Try flashcards with pictures! Make it a game - if they get 5 right, they choose the next bedtime story. We also joined REACH's weekly storytime group — very helpful!",
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: 3,
        author: "Anonymous Parent",
        authorRole: "Parent", 
        timestamp: "30 min ago",
        content: "That's a great idea! Where can I find the storytime group schedule?",
        likes: 3,
        isLiked: false
      }
    ]
  },
  {
    id: 4,
    author: "David L.",
    authorRole: "Volunteer",
    timestamp: "20 min ago",
    content: "As a volunteer tutor, I've seen great results with the 'word hunt' game. Hide sight word cards around the house and let them find them. Makes learning active and fun!",
    likes: 6,
    isLiked: false
  }
]

export default function DiscussionPost() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Link href="/community">
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <ArrowLeft className="w-5 h-5 text-gray-600 stroke-2" />
                </Button>
              </Link>
              <h1 className="text-lg font-semibold text-gray-900">Discussion</h1>
            </div>
            <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
              <Bookmark className={`w-5 h-5 stroke-2 ${discussionPost.isBookmarked ? 'text-green-600 fill-green-100' : 'text-gray-600'}`} />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6 space-y-6">
          {/* Original Post */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="space-y-4">
                {/* Post Header */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600 stroke-2" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{discussionPost.author}</span>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs px-2 py-0.5">
                        {discussionPost.authorRole}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">{discussionPost.timestamp}</span>
                  </div>
                </div>

                {/* Post Title */}
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  {discussionPost.title}
                </h2>

                {/* Post Content */}
                <p className="text-gray-700 leading-relaxed">
                  {discussionPost.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {discussionPost.tags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="secondary" 
                      className="bg-gray-100 text-gray-600 border-gray-200 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Engagement Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 group">
                      <Heart className={`w-5 h-5 stroke-2 group-hover:text-red-500 transition-colors ${
                        discussionPost.isLiked ? 'text-red-500 fill-red-100' : 'text-gray-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-600">{discussionPost.engagement.likes}</span>
                    </button>
                    
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-5 h-5 text-gray-500 stroke-2" />
                      <span className="text-sm font-medium text-gray-600">{discussionPost.engagement.replies}</span>
                    </div>
                    
                    <button className="flex items-center gap-1.5 group">
                      <Share className="w-5 h-5 text-gray-500 stroke-2 group-hover:text-green-500 transition-colors" />
                      <span className="text-sm font-medium text-gray-600">{discussionPost.engagement.shares}</span>
                    </button>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    Follow Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Replies ({discussionPost.engagement.replies})
            </h3>

            {replies.map((reply) => (
              <div key={reply.id} className="space-y-3">
                {/* Main Reply */}
                <Card className="bg-white border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Reply Header */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-green-600 stroke-2" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 text-sm">{reply.author}</span>
                            <Badge className={`text-xs px-2 py-0.5 ${
                              reply.authorRole === 'Teacher' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                              reply.authorRole === 'Volunteer' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                              'bg-blue-100 text-blue-700 border-blue-200'
                            }`}>
                              {reply.authorRole}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500">{reply.timestamp}</span>
                        </div>
                      </div>

                      {/* Reply Content */}
                      <p className="text-gray-700 text-sm leading-relaxed ml-11">
                        {reply.content}
                      </p>

                      {/* Reply Actions */}
                      <div className="flex items-center gap-3 ml-11">
                        <button className="flex items-center gap-1 group">
                          <Heart className={`w-4 h-4 stroke-2 group-hover:text-red-500 transition-colors ${
                            reply.isLiked ? 'text-red-500 fill-red-100' : 'text-gray-400'
                          }`} />
                          <span className="text-xs text-gray-500">{reply.likes}</span>
                        </button>
                        
                        <button className="text-xs text-green-600 font-medium hover:text-green-700">
                          Reply
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Nested Replies */}
                {reply.replies && reply.replies.map((nestedReply) => (
                  <div key={nestedReply.id} className="ml-6">
                    <Card className="bg-gray-50 border-0 shadow-sm">
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          {/* Nested Reply Header */}
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-3 h-3 text-green-600 stroke-2" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 text-xs">{nestedReply.author}</span>
                                <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs px-1.5 py-0.5">
                                  {nestedReply.authorRole}
                                </Badge>
                              </div>
                              <span className="text-xs text-gray-500">{nestedReply.timestamp}</span>
                            </div>
                          </div>

                          {/* Nested Reply Content */}
                          <p className="text-gray-700 text-xs leading-relaxed ml-8">
                            {nestedReply.content}
                          </p>

                          {/* Nested Reply Actions */}
                          <div className="flex items-center gap-2 ml-8">
                            <button className="flex items-center gap-1 group">
                              <Heart className={`w-3 h-3 stroke-2 group-hover:text-red-500 transition-colors ${
                                nestedReply.isLiked ? 'text-red-500 fill-red-100' : 'text-gray-400'
                              }`} />
                              <span className="text-xs text-gray-500">{nestedReply.likes}</span>
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Reply Input Bar - Sticky Bottom */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-green-600 stroke-2" />
            </div>
            <div className="flex-1 relative">
              <Input 
                placeholder="Write your reply..." 
                className="pr-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-green-300 rounded-full"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1 bg-green-500 hover:bg-green-600 text-white rounded-full h-8 w-8 p-0"
              >
                <Send className="w-4 h-4 stroke-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
