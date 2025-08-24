"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

// Interface for user replies
interface UserReply {
  id: string
  postId: string
  author: string
  role: string
  text: string
  timeAgo: string
  isUserReply: true
}

// Interface for reply objects
interface ReplyObject {
  author: string
  role: string
  text: string
  isUserReply?: boolean
  id?: string
}

// Interface for user posts
interface UserPost {
  id: string
  title: string
  content: string
  author: string
  authorRole: string
  category: string
  timeAgo: string
  replies: number
  likes: number
  isPinned: boolean
  isUserPost: true
  recentReplies: ReplyObject[]
}

// LocalStorage functions
const STORAGE_KEY = 'community_user_posts'
const REPLIES_STORAGE_KEY = 'community_user_replies'

const getUserPosts = (): UserPost[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const getUserReplies = (): UserReply[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(REPLIES_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveUserPost = (post: UserPost): void => {
  if (typeof window === 'undefined') return
  try {
    const posts = getUserPosts()
    posts.unshift(post)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  } catch (error) {
    console.error('Failed to save post:', error)
  }
}

const updateUserPostLikes = (postId: string, newLikes: number): void => {
  if (typeof window === 'undefined') return
  try {
    const posts = getUserPosts()
    const postIndex = posts.findIndex(post => post.id === postId)
    if (postIndex !== -1) {
      posts[postIndex].likes = newLikes
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    }
  } catch (error) {
    console.error('Failed to update likes:', error)
  }
}

const saveUserReply = (reply: UserReply): void => {
  if (typeof window === 'undefined') return
  try {
    const replies = getUserReplies()
    replies.unshift(reply)
    localStorage.setItem(REPLIES_STORAGE_KEY, JSON.stringify(replies))
  } catch (error) {
    console.error('Failed to save reply:', error)
  }
}

const updateUserPostReplies = (postId: string, newReplies: number): void => {
  if (typeof window === 'undefined') return
  try {
    const posts = getUserPosts()
    const postIndex = posts.findIndex(post => post.id === postId)
    if (postIndex !== -1) {
      posts[postIndex].replies = newReplies
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    }
  } catch (error) {
    console.error('Failed to update reply count:', error)
  }
}

// Helper function to get discussion ID (for both user posts and static posts)
const getDiscussionId = (discussion: any, index: number): string => {
  return ('id' in discussion) ? discussion.id : `static_${index}`
}

// Localized discussions content (EN / ZH)
const discussionsEn = [
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
                    { author: "Sarah M.", role: "Parent", text: "We use bedtime reading — 10 min daily worked wonders for sight words.", isUserReply: false },
                    { author: "Ms. Chen", role: "Teacher", text: "Try flashcards with pictures! Make it a game...", isUserReply: false }
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
                    { author: "David L.", role: "Volunteer", text: "What specific reading challenges is your child facing?", isUserReply: false },
                    { author: "Emma K.", role: "Parent", text: "My daughter had similar issues. Here's what helped...", isUserReply: false }
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
                    { author: "Lisa M.", role: "Parent", text: "The reward chart idea worked perfectly for us!", isUserReply: false },
                    { author: "Mr. Wong", role: "Teacher", text: "I always recommend breaking tasks into smaller chunks.", isUserReply: false }
                  ]
                },
]

const discussionsZh = [
  {
    title: "K3 升小一過渡小秘訣",
    author: "匿名家長",
    authorRole: "Parent",
    replies: 24,
    likes: 18,
    timeAgo: "2 小時前",
    isPinned: true,
    category: "一般",
    recentReplies: [
      { author: "Sarah M.", role: "Parent", text: "睡前閱讀—每天 10 分鐘，對常見詞很有幫助。", isUserReply: false },
      { author: "Ms. Chen", role: "Teacher", text: "試試帶圖卡片！把學習變成遊戲...", isUserReply: false }
    ]
  },
  {
    title: "需要英語閱讀協助",
    author: "Sarah_HK",
    authorRole: "Parent",
    replies: 12,
    likes: 8,
    timeAgo: "4 小時前",
    isPinned: false,
    category: "作業協助",
    recentReplies: [
      { author: "David L.", role: "Volunteer", text: "孩子具體遇到哪些閱讀困難呢？", isUserReply: false },
      { author: "Emma K.", role: "Parent", text: "我女兒也有類似情況。這些方法對我們有幫助...", isUserReply: false }
    ]
  },
  {
    title: "功課動機策略分享",
    author: "TeacherVolunteer",
    authorRole: "Volunteer",
    replies: 31,
    likes: 45,
    timeAgo: "6 小時前",
    isPinned: false,
    category: "技巧與策略",
    isVolunteer: true,
    recentReplies: [
      { author: "Lisa M.", role: "Parent", text: "獎勵表非常有效！", isUserReply: false },
      { author: "Mr. Wong", role: "Teacher", text: "我常建議把任務拆小步驟來完成。", isUserReply: false }
    ]
  },
]

const roleLabelsEn: Record<string, string> = {
  Teacher: "Teacher",
  Volunteer: "Volunteer",
  Staff: "Staff",
  Parent: "Parent",
}

const roleLabelsZh: Record<string, string> = {
  Teacher: "老師",
  Volunteer: "義工",
  Staff: "職員",
  Parent: "家長",
}

const timeAuctionVolunteers = [
  { name: "TeacherVolunteer", expertise: "Former K3 Teacher", hours: 4.5, answers: 12, available: true },
  { name: "ExperiencedMom", expertise: "Parent of 3", hours: 3.2, answers: 8, available: false },
  { name: "EducationExpert", expertise: "Child Psychologist", hours: 2.8, answers: 6, available: true },
  { name: "BilingualDad", expertise: "English/Chinese", hours: 2.1, answers: 5, available: true },
]

const sharedResourcesEn = [
  { id: 1, title: "Alphabet Practice Worksheets", author: "TeacherMom", downloads: 234, rating: 4.9, category: "Alphabet Time", type: "PDF" },
  { id: 2, title: "Sight Words Flashcards", author: "CreativeDad", downloads: 189, rating: 4.8, category: "Sight Words Time", type: "PDF" },
  { id: 3, title: "Reading Comprehension Tips", author: "ExperiencedMom", downloads: 156, rating: 4.7, category: "Reading Time", type: "Guide" },
]

const sharedResourcesZh = [
  { id: 1, title: "字母練習工作紙", author: "TeacherMom", downloads: 234, rating: 4.9, category: "字母時間", type: "PDF" },
  { id: 2, title: "常見詞字卡", author: "CreativeDad", downloads: 189, rating: 4.8, category: "常見詞時間", type: "PDF" },
  { id: 3, title: "閱讀理解小技巧", author: "ExperiencedMom", downloads: 156, rating: 4.7, category: "閱讀時間", type: "指南" },
]

const practiceGroupsEn = [
  { id: 1, name: "Morning Alphabet Buddies", members: 12, nextSession: "Tomorrow 9:00 AM", level: "Beginner", description: "Practice alphabet recognition together" },
  { id: 2, name: "Vocabulary Champions", members: 8, nextSession: "Today 7:00 PM", level: "Intermediate", description: "Build vocabulary through fun activities" },
  { id: 3, name: "Reading Circle", members: 15, nextSession: "Wed 6:00 PM", level: "Advanced", description: "Read stories and discuss together" },
]

const practiceGroupsZh = [
  { id: 1, name: "晨間字母夥伴", members: 12, nextSession: "明天 9:00", level: "初階", description: "一起練習字母辨識" },
  { id: 2, name: "詞彙小冠軍", members: 8, nextSession: "今天 7:00", level: "中階", description: "透過有趣活動建立詞彙量" },
  { id: 3, name: "閱讀同樂會", members: 15, nextSession: "週三 6:00", level: "進階", description: "一起讀故事並討論" },
]

export default function CommunityPage() {
  const { t, i18n } = useTranslation()
  const [activeTab, setActiveTab] = useState("discussions")
  const { isLarge } = useFontSize()
  const isZh = i18n.language?.startsWith('zh')
  
  // User posts state
  const [userPosts, setUserPosts] = useState<UserPost[]>([])
  const [userReplies, setUserReplies] = useState<UserReply[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'General'
  })
  
  // Reply state
  const [replyForms, setReplyForms] = useState<Record<string, boolean>>({})
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({})

  // Load user posts and replies on mount
  useEffect(() => {
    setUserPosts(getUserPosts())
    setUserReplies(getUserReplies())
  }, [])

  // Function to merge user replies into discussions
  const mergeRepliesIntoDiscussions = () => {
    const staticDiscussions = isZh ? discussionsZh : discussionsEn
    const allDiscussions = [...userPosts, ...staticDiscussions]
    
    return allDiscussions.map((discussion, index) => {
      const discussionId = getDiscussionId(discussion, index)
      const discussionReplies = userReplies.filter(reply => reply.postId === discussionId)
      
      // Add user replies to recent replies
      const userReplyObjects = discussionReplies.slice(0, 2).map(reply => ({
        author: reply.author,
        role: reply.role,
        text: reply.text,
        isUserReply: true,
        id: reply.id
      }))
      
      // Merge with existing replies
      const existingReplies = discussion.recentReplies || []
      const mergedReplies = [...userReplyObjects, ...existingReplies].slice(0, 2)
      
      // Update reply count for user posts
      let updatedReplies = discussion.replies
      if ('isUserPost' in discussion) {
        updatedReplies = discussion.replies + discussionReplies.length
      }
      
      return {
        ...discussion,
        replies: updatedReplies,
        recentReplies: mergedReplies
      }
    })
  }

  // Combined discussions with merged replies
  const allDiscussions = mergeRepliesIntoDiscussions()
  
  const roleLabels = isZh ? roleLabelsZh : roleLabelsEn
  const sharedResources = isZh ? sharedResourcesZh : sharedResourcesEn
  const practiceGroups = isZh ? practiceGroupsZh : practiceGroupsEn

  // Categories for the dropdown
  const categories = [
    { value: 'General', label: isZh ? '一般' : 'General' },
    { value: 'Assignment Help', label: isZh ? '作業協助' : 'Assignment Help' },
    { value: 'Tips & Strategies', label: isZh ? '技巧與策略' : 'Tips & Strategies' },
    { value: 'Resources', label: isZh ? '資源' : 'Resources' },
  ]

  // Handle form submission
  const handleSubmitPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return

    const post: UserPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: isZh ? '你' : 'You',
      authorRole: 'Parent',
      category: newPost.category,
      timeAgo: isZh ? '剛剛' : 'Just now',
      replies: 0,
      likes: 0,
      isPinned: false,
      isUserPost: true,
      recentReplies: []
    }

    saveUserPost(post)
    setUserPosts(prev => [post, ...prev])
    setNewPost({ title: '', content: '', category: 'General' })
    setIsDialogOpen(false)
  }

  // Handle like button click
  const handleLike = (discussionIndex: number) => {
    const discussion = allDiscussions[discussionIndex]
    
    if ('isUserPost' in discussion && 'id' in discussion) {
      // It's a user post - update localStorage
      const newLikes = discussion.likes + 1
      updateUserPostLikes(discussion.id, newLikes)
      
      // Update local state
      setUserPosts(prev => 
        prev.map(post => 
          post.id === discussion.id 
            ? { ...post, likes: newLikes }
            : post
        )
      )
    } else {
      // It's a static post - we can't persist this, but we can update the UI temporarily
      // For a real app, you'd want to send this to a backend
      console.log(`Liked static post: ${discussion.title}`)
    }
  }

  // Handle reply submission
  const handleReplySubmit = (discussionIndex: number) => {
    const discussion = allDiscussions[discussionIndex]
    const discussionId = getDiscussionId(discussion, discussionIndex)
    const replyText = replyTexts[discussionId]
    
    if (!replyText?.trim()) return

    const reply: UserReply = {
      id: Date.now().toString(),
      postId: discussionId,
      author: isZh ? '你' : 'You',
      role: 'Parent',
      text: replyText,
      timeAgo: isZh ? '剛剛' : 'Just now',
      isUserReply: true
    }

    // Save reply to localStorage
    saveUserReply(reply)
    setUserReplies(prev => [reply, ...prev])

    // Update reply count for user posts
    if ('isUserPost' in discussion && 'id' in discussion) {
      const newReplyCount = discussion.replies + 1
      updateUserPostReplies(discussion.id, newReplyCount)
      setUserPosts(prev => 
        prev.map(post => 
          post.id === discussion.id 
            ? { ...post, replies: newReplyCount }
            : post
        )
      )
    }

    // Clear reply form
    setReplyTexts(prev => ({ ...prev, [discussionId]: '' }))
    setReplyForms(prev => ({ ...prev, [discussionId]: false }))
  }

  // Toggle reply form
  const toggleReplyForm = (discussionIndex: number) => {
    const discussion = allDiscussions[discussionIndex]
    const discussionId = getDiscussionId(discussion, discussionIndex)
    setReplyForms(prev => ({ ...prev, [discussionId]: !prev[discussionId] }))
  }

  const tabs = [
    { id: "discussions", label: t('community.page.tabs.discussions'), icon: MessageSquare },
    { id: "resources", label: t('community.page.tabs.resources'), icon: Share2 },
    { id: "groups", label: t('community.page.tabs.groups'), icon: Users },
  ]

  return (
    <div className={`min-h-screen bg-background ${isLarge ? 'min-text-lg text-lg' : ''}`}>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Removed top header per request */}
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-6 h-6 stroke-2 z-10 pointer-events-none" />
          <Input placeholder={t('community.page.search')} className="pl-12 duolingo-card border-0 shadow-lg" />
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
              <div className="flex items-center gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="duolingo-button duolingo-gradient-primary border-0 text-white font-semibold">
                      {!isLarge && <Plus className="w-4 h-4 mr-1" />}
                      {t('community.page.discussions.newPost')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md mx-auto">
                    <DialogHeader>
                      <DialogTitle>{isZh ? '建立新貼文' : 'Create New Post'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          {isZh ? '標題' : 'Title'}
                        </label>
                        <Input
                          placeholder={isZh ? '輸入貼文標題...' : 'Enter post title...'}
                          value={newPost.title}
                          onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          {isZh ? '分類' : 'Category'}
                        </label>
                        <Select
                          value={newPost.category}
                          onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          {isZh ? '內容' : 'Content'}
                        </label>
                        <Textarea
                          placeholder={isZh ? '分享你的想法、問題或建議...' : 'Share your thoughts, questions, or suggestions...'}
                          value={newPost.content}
                          onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                          className="flex-1"
                        >
                          {isZh ? '取消' : 'Cancel'}
                        </Button>
                        <Button
                          onClick={handleSubmitPost}
                          className="flex-1 duolingo-gradient-primary border-0 text-white"
                          disabled={!newPost.title.trim() || !newPost.content.trim()}
                        >
                          {isZh ? '發布' : 'Post'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="space-y-3">
              {allDiscussions.map((discussion, index) => (
                <Card 
                  key={('id' in discussion) ? discussion.id : index} 
                  className={`duolingo-card border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow ${
                    ('isUserPost' in discussion) ? 'ring-2 ring-green-200 bg-green-50/30' : ''
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2 flex-1">
                          <h3 className="font-semibold text-foreground flex-1 leading-tight">{discussion.title}</h3>
                          {('isUserPost' in discussion) && (
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                              {isZh ? '你的貼文' : 'Your Post'}
                            </Badge>
                          )}
                        </div>
                        {discussion.isPinned && <Pin className="w-4 h-4 text-primary flex-shrink-0 ml-2" />}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{discussion.author}</span>
                        <Badge className={`text-xs px-2 py-0.5 ${
                          discussion.authorRole === 'Teacher' ? 'bg-purple-100 text-white border-purple-200' :
                          discussion.authorRole === 'Volunteer' ? 'bg-orange-100 text-white border-orange-200' :
                          discussion.authorRole === 'Parent' ? 'bg-teal-100 text-white border-teal-200' :
                          discussion.authorRole === 'Staff' ? 'bg-green-100 text-green-700 border-green-200' :
                          'bg-green-100 text-green-700 border-green-200'
                        }`}>
                          {roleLabels[discussion.authorRole] || discussion.authorRole}
                        </Badge>
                        <span>•</span>
                        <span>{discussion.timeAgo}</span>
                      </div>

                      {/* User post content preview */}
                      {('isUserPost' in discussion) && 'content' in discussion && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {discussion.content.length > 150 
                              ? discussion.content.substring(0, 150) + '...' 
                              : discussion.content
                            }
                          </p>
                        </div>
                      )}

                      {/* Recent Replies Preview */}
                      {!isLarge && discussion.recentReplies && discussion.recentReplies.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          <div className="text-xs font-medium text-gray-600 mb-2">{t('community.page.discussions.latestReplies')}</div>
                          {discussion.recentReplies.slice(0, 2).map((reply, replyIndex) => (
                            <div key={replyIndex} className="flex items-start gap-2">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                reply.isUserReply ? 'bg-blue-100' : 'bg-green-100'
                              }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                  reply.isUserReply ? 'bg-blue-500' : 'bg-green-500'
                                }`}></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="text-xs font-medium text-gray-700">{reply.author}</span>
                                  <Badge className={`text-xs px-1.5 py-0.5 ${
                                    reply.isUserReply ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                    reply.role === 'Teacher' ? 'bg-purple-100 text-white' :
                                    reply.role === 'Volunteer' ? 'bg-orange-100 text-white' :
                                    reply.role === 'Parent' ? 'bg-teal-100 text-white' :
                                    'bg-green-100 text-green-600'
                                  }`}>
                                    {reply.isUserReply ? (isZh ? '你的回覆' : 'Your Reply') : (roleLabels[reply.role] || reply.role)}
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
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-600 p-1 h-auto"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleReplyForm(index)
                            }}
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{discussion.replies}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 hover:bg-red-50 hover:text-red-600 p-1 h-auto"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleLike(index)
                            }}
                          >
                            <Heart className="w-4 h-4" />
                            <span>{discussion.likes}</span>
                          </Button>
                        </div>
                      </div>

                      {/* Reply Form */}
                      {(() => {
                        const discussionId = getDiscussionId(discussion, index)
                        return replyForms[discussionId] && (
                          <div className="border-t pt-3 mt-3">
                            <div className="space-y-3">
                              <Textarea
                                placeholder={isZh ? '寫下你的回覆...' : 'Write your reply...'}
                                value={replyTexts[discussionId] || ''}
                                onChange={(e) => setReplyTexts(prev => ({ ...prev, [discussionId]: e.target.value }))}
                                rows={3}
                                className="text-sm"
                              />
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setReplyForms(prev => ({ ...prev, [discussionId]: false }))
                                    setReplyTexts(prev => ({ ...prev, [discussionId]: '' }))
                                  }}
                                >
                                  {isZh ? '取消' : 'Cancel'}
                                </Button>
                                <Button
                                  size="sm"
                                  className="duolingo-gradient-primary border-0 text-white"
                                  disabled={!replyTexts[discussionId]?.trim()}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleReplySubmit(index)
                                  }}
                                >
                                  {isZh ? '回覆' : 'Reply'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        )
                      })()}
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
                          <Button variant="outline" size="sm" className="text-green-700 border-green-400 hover:bg-green-100">
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
