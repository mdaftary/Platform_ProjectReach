"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Play, CheckCircle2, Flame, Clock, Circle, User, Eye, ChevronRight, X, Check, AlertCircle, Download, ArrowRight, Loader, LogOut, Settings, BookOpen, Edit3, Volume2, Video, BarChart3, Star } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useFontSize } from "@/app/font-size-provider"
import { Trans } from "react-i18next"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"
import { AssignmentDetailDrawer, type AssignmentDetail } from "@/components/assignment-detail-drawer"
import { SwipeableProgressCard } from "@/components/swipeable-progress-card"

// Weekly tasks data - English version
const weeklyTasksEn = [
  {
    id: 1,
    title: "Upload Worksheet",
    subtitle: "Week 12 - Alphabet Practice",
    completed: false,
    isPrimary: true,
    icon: Camera,
  },
  {
    id: 2,
    title: "Watch Tutorial Video",
    subtitle: "Letter Recognition Tips",
    completed: true,
    isPrimary: false,
    icon: Play,
  },
  {
    id: 3,
    title: "Confirm Homework Submission",
    subtitle: "Due Today at 6:00 PM",
    completed: false,
    isPrimary: false,
    icon: CheckCircle2,
  },
]

// Weekly tasks data - Chinese version
const weeklyTasksZh = [
  {
    id: 1,
    title: "上传作业单",
    subtitle: "第12周 - 字母练习",
    completed: false,
    isPrimary: true,
    icon: Camera,
  },
  {
    id: 2,
    title: "观看教学视频",
    subtitle: "字母识别技巧",
    completed: true,
    isPrimary: false,
    icon: Play,
  },
  {
    id: 3,
    title: "确认作业提交",
    subtitle: "今日下午6:00截止",
    completed: false,
    isPrimary: false,
    icon: CheckCircle2,
  },
]

// Detailed assignment data - English version
const assignmentDetailsEn: AssignmentDetail[] = [
  {
    id: 1,
    title: "Upload Worksheet",
    subtitle: "Week 12 - Alphabet Practice",
    description: "Complete the alphabet recognition worksheet by identifying and circling the correct letters. This assignment helps reinforce letter recognition skills and improves visual discrimination between similar letters.",
    subject: "Language Arts",
    dueDate: "Today at 6:00 PM",
    estimatedTime: "15-20 minutes",
    difficulty: 'Easy',
    objectives: [
      "Identify uppercase and lowercase letters A-Z",
      "Distinguish between similar-looking letters (b/d, p/q)",
      "Practice fine motor skills through circling activities",
      "Build confidence in letter recognition"
    ],
    materials: [
      "Printed worksheet (provided)",
      "Pencil or pen",
      "Eraser",
      "Quiet workspace"
    ],
    instructions: [
      "Print the worksheet from the assignment materials section",
      "Find a quiet place to work without distractions",
      "Read each question carefully before answering",
      "Circle the correct letters as instructed in each section",
      "Check your work before submitting",
      "Take a photo of your completed worksheet and upload it"
    ],
    completed: false,
    icon: Camera
  },
  {
    id: 2,
    title: "Watch Tutorial Video",
    subtitle: "Letter Recognition Tips",
    description: "Watch an educational video about effective letter recognition strategies. The video covers techniques for remembering letter shapes, common mistakes to avoid, and fun memory tricks.",
    subject: "Language Arts",
    dueDate: "Tomorrow at 5:00 PM",
    estimatedTime: "10-15 minutes",
    difficulty: 'Easy',
    objectives: [
      "Learn effective letter recognition strategies",
      "Understand common letter confusion patterns",
      "Discover memory techniques for better retention",
      "Apply tips to improve reading skills"
    ],
    materials: [
      "Device with internet connection",
      "Headphones (optional)",
      "Notebook for taking notes"
    ],
    instructions: [
      "Click the video link provided in the assignment",
      "Ensure you have a stable internet connection",
      "Watch the entire video without skipping",
      "Take notes on key strategies mentioned",
      "Pause and replay sections if needed",
      "Complete the short quiz after the video"
    ],
    completed: true,
    icon: Play
  },
  {
    id: 3,
    title: "Confirm Homework Submission",
    subtitle: "Due Today at 6:00 PM",
    description: "Review and confirm that all your homework assignments for this week have been properly submitted. Check your submission status and ensure all required materials are uploaded.",
    subject: "General",
    dueDate: "Today at 6:00 PM",
    estimatedTime: "5-10 minutes",
    difficulty: 'Easy',
    objectives: [
      "Verify all assignments are submitted",
      "Check submission timestamps",
      "Ensure file formats are correct",
      "Confirm receipt of submission confirmations"
    ],
    materials: [
      "Access to student portal",
      "List of this week's assignments",
      "Submission confirmation emails"
    ],
    instructions: [
      "Log into your student portal",
      "Navigate to the assignments section",
      "Check the status of each assignment for this week",
      "Verify that all files uploaded correctly",
      "Contact your teacher if any submissions are missing",
      "Print or save confirmation receipts"
    ],
    completed: false,
    icon: CheckCircle2
  }
]

// Detailed assignment data - Chinese version
const assignmentDetailsZh: AssignmentDetail[] = [
  {
    id: 1,
    title: "上传作业单",
    subtitle: "第12周 - 字母练习",
    description: "通过识别和圈出正确的字母来完成字母识别练习单。这项作业有助于加强字母识别技能，提高对相似字母的视觉辨别能力。",
    subject: "语言艺术",
    dueDate: "今日下午6:00",
    estimatedTime: "15-20分钟",
    difficulty: 'Easy',
    objectives: [
      "识别大写和小写字母A-Z",
      "区分相似字母（b/d, p/q）",
      "通过圈圈活动练习精细动作技能",
      "建立字母识别的信心"
    ],
    materials: [
      "打印的练习单（已提供）",
      "铅笔或钢笔",
      "橡皮擦",
      "安静的学习空间"
    ],
    instructions: [
      "从作业材料部分打印练习单",
      "找一个安静无干扰的地方学习",
      "仔细阅读每个问题后再回答",
      "按照每部分的指示圈出正确的字母",
      "提交前检查你的答案",
      "拍摄完成的练习单照片并上传"
    ],
    completed: false,
    icon: Camera
  },
  {
    id: 2,
    title: "观看教学视频",
    subtitle: "字母识别技巧",
    description: "观看关于有效字母识别策略的教育视频。视频涵盖记忆字母形状的技巧、要避免的常见错误以及有趣的记忆诀窍。",
    subject: "语言艺术",
    dueDate: "明日下午5:00",
    estimatedTime: "10-15分钟",
    difficulty: 'Easy',
    objectives: [
      "学习有效的字母识别策略",
      "理解常见的字母混淆模式",
      "发现更好记忆的技巧",
      "应用技巧提高阅读技能"
    ],
    materials: [
      "有网络连接的设备",
      "耳机（可选）",
      "记笔记的笔记本"
    ],
    instructions: [
      "点击作业中提供的视频链接",
      "确保网络连接稳定",
      "完整观看视频，不要跳过",
      "记录提到的关键策略",
      "需要时可以暂停和重播",
      "完成视频后的简短测验"
    ],
    completed: true,
    icon: Play
  },
  {
    id: 3,
    title: "确认作业提交",
    subtitle: "今日下午6:00截止",
    description: "审查并确认本周所有家庭作业已正确提交。检查提交状态并确保所有必需材料已上传。",
    subject: "综合",
    dueDate: "今日下午6:00",
    estimatedTime: "5-10分钟",
    difficulty: 'Easy',
    objectives: [
      "验证所有作业已提交",
      "检查提交时间戳",
      "确保文件格式正确",
      "确认收到提交确认"
    ],
    materials: [
      "学生门户访问权限",
      "本周作业清单",
      "提交确认邮件"
    ],
    instructions: [
      "登录学生门户",
      "导航到作业部分",
      "检查本周每项作业的状态",
      "验证所有文件正确上传",
      "如有遗漏作业请联系老师",
      "打印或保存确认收据"
    ],
    completed: false,
    icon: CheckCircle2
  }
]

// Progress categories data
const progressCategories = [
  { name: "alphabet", progress: 85, color: "text-green-600", barColor: "bg-green-500" },
  { name: "sightWords", progress: 72, color: "text-blue-600", barColor: "bg-blue-500" },
  { name: "vocabulary", progress: 68, color: "text-blue-600", barColor: "bg-blue-400" },
  { name: "phonemicAwareness", progress: 79, color: "text-green-600", barColor: "bg-green-400" },
  { name: "pointAndRead", progress: 91, color: "text-green-600", barColor: "bg-green-500" },
]



export default function HomePage() {
  const { t, i18n } = useTranslation()
  const { isLarge } = useFontSize()
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Select tasks based on current language
  const weeklyTasks = i18n.language === 'zh' ? weeklyTasksZh : weeklyTasksEn
  const assignmentDetails = i18n.language === 'zh' ? assignmentDetailsZh : assignmentDetailsEn

  // Drawer state
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentDetail | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  const handleUploadClick = () => {
    setUploadModalOpen(true)
    setUploadState('uploading')
    
    // Simulate file upload
    setTimeout(() => {
      setUploadedImage('/worksheet-example.jpg') // Mock uploaded image
      setUploadState('processing')
      
      // Simulate OCR processing
      setTimeout(() => {
        setUploadState('complete')
      }, 3000)
    }, 1500)
  }

  const closeModal = () => {
    setUploadModalOpen(false)
    setUploadState('idle')
    setUploadedImage(null)
  }

  const handleAssignmentClick = (taskId: number) => {
    const assignment = assignmentDetails.find(detail => detail.id === taskId)
    if (assignment) {
      setSelectedAssignment(assignment)
      setDrawerOpen(true)
    }
  }

  const handleAssignmentComplete = (assignmentId: number) => {
    // Handle assignment completion logic here
    console.log(`Completing assignment ${assignmentId}`)
    setDrawerOpen(false)
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isLarge ? 'min-text-lg text-lg' : ''}`}>

      <div className="max-w-md mx-auto px-6 space-y-5">
        {/* Swipeable Progress Card */}
        <SwipeableProgressCard />

        {/* Urgent Assignment Card */}
        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4" />
              <span className="text-sm">The deadline is almost up</span>
              <div className="ml-auto bg-black/20 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">20:38</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-3 leading-tight">
              {weeklyTasks[0]?.title || "Upload Worksheet"}
            </h2>
            
            <p className="text-purple-100 text-sm mb-4">
              {weeklyTasks[0]?.subtitle || "Week 12 - Alphabet Practice"}
            </p>

            {weeklyTasks[0] && !weeklyTasks[0].completed && (
                      <Button 
                        size="sm" 
                        onClick={handleUploadClick}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2 text-sm font-semibold rounded-xl backdrop-blur-sm"
                      >
                <Camera className="w-4 h-4 mr-2" />
                        {t('home.upload')}
                      </Button>
                    )}
          </div>
          
          {/* Camera/upload icon decoration */}
          <div className="absolute bottom-4 right-6 text-6xl font-bold text-white/20">
            <Camera className="w-16 h-16" />
                  </div>
          
          {/* Geometric background patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 right-4 w-24 h-24 border border-white rotate-45"></div>
            <div className="absolute bottom-8 left-4 w-16 h-16 border border-white rounded-full"></div>
              </div>
        </div>

        {/* Current Assignments Section */}
              <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">Your current assignments</h2>
            <span className="text-gray-500 text-sm">Tasks</span>
                  </div>
          
          <div className="grid gap-4">
            {/* Remaining Weekly Tasks (skip the first one as it's in the urgent card) */}
            {weeklyTasks.slice(1).map((task, index) => {
              const actualIndex = index + 1; // Since we're starting from the second task
              const TaskIcon = task.icon;
              
              // Determine icon background color based on task type
              let iconBgColor = "bg-blue-400";
              
                            return (
                <div 
                  key={task.id} 
                  className="grid grid-cols-[3rem_3rem_1fr_auto] items-center gap-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors p-2 -m-2"
                  onClick={() => handleAssignmentClick(task.id)}
                >
                  {/* Column 1: Number */}
                  <div className="text-4xl font-light text-gray-300 justify-self-start">
                    {String(actualIndex).padStart(2, '0')}
                  </div>
                  
                  {/* Column 2: Icon */}
                  <div className={`w-12 h-12 ${iconBgColor} rounded-2xl flex items-center justify-center justify-self-start`}>
                    <TaskIcon className="w-6 h-6 text-white" />
        </div>

                  {/* Column 3: Text Content */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {task.title}
                      </h3>
                      {task.completed && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">
                      {task.subtitle}
                    </p>
        </div>

                  {/* Column 4: Arrow */}
                  <div className="justify-self-end">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
              );
            })}
          </div>
        </div>

        {/* Bottom padding for navigation */}
        <div className="h-24"></div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
              <h2 className="text-xl font-bold text-gray-900">{t('home.modalUploadWorksheet')}</h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Upload State: Uploading */}
              {uploadState === 'uploading' && (
                                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Loader className="w-8 h-8 text-green-600 animate-spin stroke-2" />
                    </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{t('home.uploading')}</p>
                    <p className="text-sm text-gray-500 mt-1">{t('home.processingWorksheet')}</p>
                  </div>
                </div>
              )}

              {/* Upload State: Processing */}
              {uploadState === 'processing' && (
                <div className="space-y-6">
                  {/* Success Banner */}
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white stroke-2" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-900">{t('home.uploadedSuccessfully')}</p>
                        <p className="text-sm text-green-700">Week 12 - Alphabet Practice</p>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Image Preview */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">{t('home.uploadedWorksheet')}</h3>
                    <div className="bg-gray-100 rounded-2xl p-4 aspect-[4/3] flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Camera className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">{t('home.worksheetPreview')}</p>
                        <p className="text-xs">{t('home.sightWordTask')}</p>
                      </div>
                    </div>
                  </div>

                  {/* OCR Processing */}
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Loader className="w-6 h-6 text-green-600 animate-spin stroke-2" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t('home.analyzing')}</p>
                      <p className="text-sm text-gray-500 mt-1">{t('home.takes3060')}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload State: Complete */}
              {uploadState === 'complete' && (
                <div className="space-y-6">
                  {/* Success Banner */}
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white stroke-2" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-900">{t('home.analysisComplete')}</p>
                        <p className="text-sm text-green-700">{t('home.emmaReviewed')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bump */}
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white stroke-2" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-900">{t('home.progressUpdated')}</p>
                        <p className="text-sm text-green-700">{t('home.progressDelta')}</p>
                      </div>
                    </div>
                  </div>

                  {/* AI Feedback Section */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">{t('home.aiFeedback')}</h3>
                    <Card className="bg-white border border-gray-200 shadow-sm">
                      <CardContent className="p-5">
                        <div className="space-y-5">
                        
                        {/* What Went Well Section */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 stroke-2" />
                            <h4 className="text-sm font-semibold text-green-800">{t('home.whatWentWell')}</h4>
                          </div>
                          <div className="bg-green-50/50 rounded-xl p-3">
                            <p className="text-sm text-gray-900 leading-relaxed">
                              Correctly circled <span className="font-semibold">"see"</span> and <span className="font-semibold">"cat"</span>. Great recognition skills!
                            </p>
                          </div>
                        </div>

                        {/* Needs Practice Section */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-600 stroke-2" />
                            <h4 className="text-sm font-semibold text-orange-800">{t('home.needsPractice')}</h4>
                          </div>
                          <div className="bg-orange-50/50 rounded-xl p-3">
                            <p className="text-sm text-gray-900 leading-relaxed">
                              Didn't circle <span className="font-semibold">"apple"</span>. Try double-checking sight words.
                            </p>
                          </div>
                        </div>

                        {/* General Notes Section */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-green-600 stroke-2" />
                            <h4 className="text-sm font-semibold text-green-800">{t('home.generalNotes')}</h4>
                          </div>
                          <div className="bg-green-50/50 rounded-xl p-3">
                            <p className="text-sm text-gray-900 leading-relaxed">
                              Good tracing, but spacing between <span className="font-semibold">"p"</span> and <span className="font-semibold">"a"</span> in "panda" needs work.
                            </p>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 pt-4">
                          <h4 className="font-semibold text-gray-900 mb-3">{t('home.suggestedNextSteps')}</h4>
                          
                          <div className="space-y-3">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white border-0 rounded-xl font-semibold">
                              <ArrowRight className="w-4 h-4 mr-2 stroke-2" />
                              {t('home.viewRecommendedPractice')}
                            </Button>
                            
                            <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                              <Download className="w-4 h-4 stroke-2" />
                              {t('home.downloadExtraWorksheet')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                  {/* Close Button */}
                  <Button 
                    onClick={closeModal}
                    variant="outline"
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold"
                  >
                    {t('home.done')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Assignment Detail Drawer */}
      <AssignmentDetailDrawer
        assignment={selectedAssignment}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onComplete={handleAssignmentComplete}
      />
    </div>
  )
}