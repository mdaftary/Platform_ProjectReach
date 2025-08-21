"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageSquare,
  ArrowLeft,
  Heart,
  MessageCircle,
  Pin,
  Star,
  HelpCircle,
  ThumbsUp,
  Reply,
  Flag,
} from "lucide-react"
import Link from "next/link"

export default function DiscussionDetailPage({ params }: { params: { id: string } }) {
  const [newReply, setNewReply] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  // Mock discussion data
  const discussion = {
    id: params.id,
    title: "Tips for K3 to Primary 1 Transition",
    category: "general",
    author: "Parent_Mom123",
    isAnonymous: true,
    content: `My daughter is starting Primary 1 next year and I'm really worried about the transition. She's doing well in K3 but I've heard P1 is much more demanding.

Has anyone been through this transition recently? What should I be preparing her for? Any tips on:
- Academic preparation
- Social adjustment
- Daily routine changes
- Homework expectations

I want to make sure she's ready but don't want to overwhelm her. Any advice would be greatly appreciated!`,
    replies: 24,
    likes: 18,
    createdAt: "2 days ago",
    isPinned: true,
    isPopular: true,
    tags: ["transition", "primary-1", "preparation"],
  }

  const replies = [
    {
      id: "1",
      author: "TeacherVolunteer",
      isAnonymous: false,
      isVolunteer: true,
      content: `As a former K3 teacher, I can share some insights that might help:

**Academic Preparation:**
- Focus on basic reading fluency - she should be comfortable reading simple sentences
- Practice writing her name and basic characters clearly
- Work on number recognition and simple addition/subtraction

**Social Skills:**
- Encourage independence in tasks like organizing her bag
- Practice following multi-step instructions
- Help her express her needs clearly to adults

The transition is gradual, so don't worry too much! Most children adapt well within the first month.`,
      likes: 12,
      createdAt: "1 day ago",
      isHelpful: true,
    },
    {
      id: "2",
      author: "ExperiencedMom",
      isAnonymous: false,
      isVolunteer: false,
      content: `I went through this with my eldest last year. The biggest change was the homework routine! 

Start establishing a quiet study time now, even if it's just 15-20 minutes. We found that having a dedicated homework space really helped.

Also, don't underestimate the importance of good sleep habits. P1 days are longer and more tiring.`,
      likes: 8,
      createdAt: "1 day ago",
      isHelpful: false,
    },
    {
      id: "3",
      author: "Anonymous_Parent",
      isAnonymous: true,
      isVolunteer: false,
      content: `Thank you both for the advice! @TeacherVolunteer your tips are really helpful. I'm going to start working on the independence skills you mentioned.

@ExperiencedMom good point about the homework routine. We'll start practicing that now.

One more question - how much Chinese should she know? We speak mostly English at home and I'm worried about the Chinese lessons.`,
      likes: 3,
      createdAt: "18 hours ago",
      isHelpful: false,
    },
    {
      id: "4",
      author: "BilingualDad",
      isAnonymous: false,
      isVolunteer: true,
      content: `@Anonymous_Parent Don't worry too much about Chinese! Many families are in the same situation.

Here are some practical tips:
- Start with basic characters for everyday items (水, 火, 人, etc.)
- Use Chinese picture books - even if she can't read, she'll get familiar with the characters
- Consider Chinese educational apps that make learning fun
- Most importantly, communicate with her P1 teacher about your concerns

Schools are very understanding about different language backgrounds at home.`,
      likes: 15,
      createdAt: "12 hours ago",
      isHelpful: true,
    },
  ]

  const handleSubmitReply = () => {
    if (newReply.trim()) {
      // In real app, submit to API
      console.log("Submitting reply:", { content: newReply, isAnonymous })
      setNewReply("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/community" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Discussion</h1>
                <p className="text-sm text-muted-foreground">REACH Community</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Emma Chen - K3
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Original Post */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 flex-wrap">
                  {discussion.isPinned && (
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                      <Pin className="w-3 h-3 mr-1" />
                      Pinned
                    </Badge>
                  )}
                  {discussion.isPopular && (
                    <Badge variant="secondary" className="text-xs bg-accent/10 text-accent-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    General Discussion
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{discussion.title}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-muted">
                  {discussion.isAnonymous ? "A" : discussion.author.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {discussion.isAnonymous ? "Anonymous Parent" : discussion.author}
                </p>
                <p className="text-sm text-muted-foreground">{discussion.createdAt}</p>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-foreground">{discussion.content}</div>
            </div>

            {/* Tags */}
            <div className="flex items-center space-x-2">
              {discussion.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Heart className="w-4 h-4 mr-1" />
                  {discussion.likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {discussion.replies}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Flag className="w-4 h-4 mr-1" />
                  Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-foreground">Replies ({replies.length})</h3>

          {replies.map((reply) => (
            <Card key={reply.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-muted">
                      {reply.isAnonymous ? "A" : reply.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="font-medium text-foreground">
                        {reply.isAnonymous ? "Anonymous Parent" : reply.author}
                      </p>
                      {reply.isVolunteer && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          <HelpCircle className="w-3 h-3 mr-1" />
                          Volunteer
                        </Badge>
                      )}
                      {reply.isHelpful && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          Helpful
                        </Badge>
                      )}
                      <p className="text-sm text-muted-foreground">{reply.createdAt}</p>
                    </div>

                    <div className="prose prose-sm max-w-none mb-3">
                      <div className="whitespace-pre-wrap text-foreground">{reply.content}</div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Heart className="w-4 h-4 mr-1" />
                        {reply.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Reply className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Flag className="w-4 h-4 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reply Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add Your Reply</CardTitle>
            <CardDescription>Share your thoughts and help other parents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Write your reply here..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              rows={4}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-border"
                />
                <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                  Post anonymously
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleSubmitReply}
                  disabled={!newReply.trim()}
                >
                  Post Reply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
