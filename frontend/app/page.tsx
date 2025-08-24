"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Play, CheckCircle2, Flame, Clock, Circle, User, Eye, ChevronRight, X, Check, AlertCircle, Download, ArrowRight, Loader, LogOut, Settings, BookOpen, Edit3, Volume2, Video, BarChart3, Star, Users, FileText } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useFontSize } from "@/app/font-size-provider"
import { Trans } from "react-i18next"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"
import { AssignmentDetailDrawer, type AssignmentDetail } from "@/components/assignment-detail-drawer"
import { PreviousAssignmentDetailDrawer, type PreviousAssignment } from "@/components/previous-assignment-detail-drawer"
import { SwipeableProgressCard } from "@/components/swipeable-progress-card"

// Weekly tasks data - English version
const weeklyTasksEn = [
  {
    id: 1,
    title: "Week 12 - Alphabet Practice",
    subtitle: "Upload Worksheet",
    completed: false,
    isPrimary: true,
    icon: Camera,
    subject: "Alphabet",
    pointReward: 10,
  },
  {
    id: 2,
    title: "Letter Recognition Tips",
    subtitle: "Watch Tutorial Video",
    completed: false,
    isPrimary: false,
    icon: Play,
    subject: "Alphabet",
    pointReward: 10,
  },
  {
    id: 3,
    title: "Alphabet practice tutoring",
    subtitle: "Live tutoring at 25/8/2025 21:00",
    completed: false,
    isPrimary: false,
    icon: Users,
    subject: "Alphabet",
    pointReward: 10,
  },
]

// Weekly tasks data - Chinese version
const weeklyTasksZh = [
  {
    id: 1,
    title: "第12周 - 字母練習",
    subtitle: "上傳功課",
    completed: false,
    isPrimary: true,
    icon: Camera,
    subject: "字母",
    pointReward: 10,
  },
  {
    id: 2,
    title: "字母識別技巧",
    subtitle: "觀看教學視頻",
    completed: false,
    isPrimary: false,
    icon: Play,
    subject: "字母",
    pointReward: 10,
  },
  {
    id: 3,
    title: "字母練習輔導",
    subtitle: "25/8/2025 21:00實時輔導",
    completed: false,
    isPrimary: false,
    icon: Users,
    subject: "字母",
    pointReward: 10,
  },
]

// Detailed assignment data - English version
const assignmentDetailsEn: AssignmentDetail[] = [
  {
    id: 1,
    title: "Week 12 - Alphabet Practice",
    subtitle: "Upload Worksheet",
    description: "Complete the alphabet recognition worksheet by identifying and circling the correct letters. This assignment helps reinforce letter recognition skills and improves visual discrimination between similar letters.",
    subject: "Alphabet",
    dueDate: "25/8/2025 23:00",
    estimatedTime: "15-20 minutes",
    difficulty: 'Easy',
    objectives: [
      "Identify uppercase and lowercase letters A-Z",
      "Distinguish between similar-looking letters (b/d, p/q)",
      "Build confidence in letter recognition"
    ],
    materials: [
      "Printed worksheet (provided)",
      "Pencil or pen",
      "Eraser",
    ],
    instructions: [
      "Print the worksheet from the assignment materials section",
      "Circle the correct letters as instructed in each section",
      "Take a photo of your completed worksheet and upload it"
    ],
    completed: false,
    buttonText: "Upload Worksheet",
    pointReward: 10,
    icon: Camera
  },
  {
    id: 2,
    title: "Letter Recognition Tips",
    subtitle: "Watch Tutorial Video",
    description: "Watch an educational video about effective letter recognition strategies. The video covers techniques for remembering letter shapes, common mistakes to avoid, and fun memory tricks.",
    subject: "Alphabet",
    dueDate: "26/8/2025 23:00",
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
    ],
    instructions: [
      "Click the video link provided in the assignment",
      "Watch the entire video without skipping",
      "Complete the short quiz after the video"
    ],
    completed: false,
    buttonText: "Watch Tutorial Video",
    pointReward: 10,
    icon: Play
  },
  {
    id: 3,
    title: "Alphabet practice tutoring",
    subtitle: "Live tutoring at 25/8/2025 21:00",
    description: "Our volunteer tutors will be available to help you with your homework assignments.",
    subject: "Alphabet",
    dueDate: "26/8/2025 23:00",
    estimatedTime: "5-10 minutes",
    difficulty: 'Easy',
    objectives: [
      "Join the live tutoring session",
      "Ask questions about the assignment",
      "Get help with the assignment",
    ],
    materials: [
      "Alphabet practice worksheet",
    ],
    instructions: [
      "Join the live tutoring session at 25/8/2025 21:00 via Zoom",
    ],
    completed: false,
    buttonText: "I am interested, remind me",
    pointReward: 10,
    icon: CheckCircle2
  }
]

// Detailed assignment data - Chinese version
const assignmentDetailsZh: AssignmentDetail[] = [
  {
    id: 1,
    title: "第12周 - 字母練習",
    subtitle: "上傳功課",
    description: "通過識別和圈出正確的字母來完成字母識別練習單。這項功課有助於加強字母識別技能，提高對相似字母的視覺辨別能力。",
    subject: "字母",
    dueDate: "25/8/2025 23:00",
    estimatedTime: "15-20分鐘",
    difficulty: 'Easy',
    objectives: [
      "識別大寫和小寫字母A-Z",
      "區分相似字母（b/d, p/q）",
      "建立字母識別的信心"
    ],
    materials: [
      "打印的練習單（已提供）",
      "鉛筆或鋼筆",
      "橡皮擦"
    ],
    instructions: [
      "從功課材料部分打印練習單",
      "按照每部分的指示圈出正確的字母",
      "拍攝完成的練習單照片並上傳"
    ],
    completed: false,
    buttonText: "上傳功課",
    pointReward: 10,
    icon: Camera
  },
  {
    id: 2,
    title: "字母識別技巧",
    subtitle: "觀看教學視頻",
    description: "觀看關於有效字母識別策略的教育視頻。視頻涵蓋記憶字母形狀的技巧、要避免的常見錯誤以及有趣的記憶訣竅。",
    subject: "字母",
    dueDate: "26/8/2025 23:00",
    estimatedTime: "10-15分鐘",
    difficulty: 'Easy',
    objectives: [
      "學習有效的字母識別策略",
      "理解常見的字母混淆模式",
      "發現更好記憶的技巧",
      "應用技巧提高閱讀技能"
    ],
    materials: [
      "有網絡連接的設備"
    ],
    instructions: [
      "點擊功課中提供的視頻鏈接",
      "完整觀看視頻，不要跳過",
      "完成視頻後的簡短測驗"
    ],
    completed: false,
    buttonText: "觀看教學視頻",
    pointReward: 10,
    icon: Play
  },
  {
    id: 3,
    title: "字母練習輔導",
    subtitle: "25/8/2025 21:00實時輔導",
    description: "我們的義工導師將協助您完成功課作業。",
    subject: "字母",
    dueDate: "26/8/2025 23:00",
    estimatedTime: "5-10分鐘",
    difficulty: 'Easy',
    objectives: [
      "參加實時輔導課程",
      "就功課提出問題",
      "獲得功課協助"
    ],
    materials: [
      "字母練習功課"
    ],
    instructions: [
      "於25/8/2025 21:00通過Zoom參加實時輔導課程"
    ],
    completed: false,
    buttonText: "我有興趣，請提醒我",
    pointReward: 10,
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

// Previous assignments data - English version
const previousAssignmentsEn = [
  {
    id: 11,
    title: "Week 11 - Sight Words Practice",
    subtitle: "Word Recognition Exercise",
    subject: "Sight Words",
    submittedDate: "15/8/2025",
    score: 9,
    status: "graded",
    difficulty: "Easy",
    pointsEarned: 15
  },
  {
    id: 10,
    title: "Week 10 - Letter Writing",
    subtitle: "Handwriting Practice",
    subject: "Alphabet",
    submittedDate: "8/8/2025",
    score: 8,
    status: "graded",
    difficulty: "Medium",
    pointsEarned: 12
  },
  {
    id: 9,
    title: "Week 9 - Phonics Sounds",
    subtitle: "Sound Recognition",
    subject: "Phonemic Awareness",
    submittedDate: "1/8/2025",
    score: 9,
    status: "graded",
    difficulty: "Easy",
    pointsEarned: 14
  },
  {
    id: 8,
    title: "Week 8 - Reading Comprehension",
    subtitle: "Short Story Questions",
    subject: "Point-and-Read",
    submittedDate: "25/7/2025",
    score: 7,
    status: "graded",
    difficulty: "Medium",
    pointsEarned: 11
  },
  {
    id: 7,
    title: "Week 7 - Vocabulary Building",
    subtitle: "New Words Exercise",
    subject: "Vocabulary",
    submittedDate: "18/7/2025",
    score: 10,
    status: "graded",
    difficulty: "Easy",
    pointsEarned: 16,
    feedback: "Good job!"
  },
  {
    id: 6,
    title: "Week 6 - Grammar Basics",
    subtitle: "Sentence Structure",
    subject: "Sight Words",
    submittedDate: "11/7/2025",
    score: 8,
    status: "graded",
    difficulty: "Medium",
    pointsEarned: 13,
    feedback: "Good job!"
  },
  {
    id: 5,
    title: "Week 5 - Spelling Practice",
    subtitle: "Common Words Test",
    subject: "Alphabet",
    submittedDate: "4/7/2025",
    score: 9,
    status: "graded",
    difficulty: "Easy",
      pointsEarned: 14,
    feedback: "Good job!"
  },
  {
    id: 4,
    title: "Week 4 - Story Writing",
    subtitle: "Creative Writing",
    subject: "Point-and-Read",
    submittedDate: "27/6/2025",
    score: 6,
    status: "graded",
    difficulty: "Hard",
    pointsEarned: 10,
    feedback: "Good job!"
  },
  {
    id: 3,
    title: "Week 3 - Letter Sounds",
    subtitle: "Phonetic Practice",
    subject: "Phonemic Awareness",
    submittedDate: "20/6/2025",
    score: 9,
    status: "graded",
    difficulty: "Easy",
    pointsEarned: 15,
    feedback: "Good job!"
  },
  {
    id: 2,
    title: "Week 2 - Basic Reading",
    subtitle: "Simple Sentences",
    subject: "Vocabulary",
    submittedDate: "13/6/2025",
    score: 8,
    status: "graded",
    difficulty: "Easy",
    pointsEarned: 13,
    feedback: "Good job!"
  }
]

// Previous assignments data - Chinese version
const previousAssignmentsZh = [
  {
    id: 11,
    title: "第11周 - 常見詞練習",
    subtitle: "詞彙識別練習",
    subject: "常見詞",
    submittedDate: "15/8/2025",
    score: 9,
    status: "graded",
    difficulty: "Easy",
    pointsEarned: 15,
    feedback: "Good job!"
  },
  {
    id: 10,
    title: "第10周 - 字母書寫",
    subtitle: "書寫練習",
    subject: "字母",
    submittedDate: "8/8/2025",
    score: 8,
    status: "graded",
    difficulty: "Medium",
    pointsEarned: 12,
    feedback: "Good job!"
  },
  {
    id: 9,
    title: "第9周 - 語音練習",
    subtitle: "聲音識別",
    subject: "語音意識",
    submittedDate: "1/8/2025",
    score: 9,
    status: "graded",
    difficulty: "Easy",
    pointsEarned: 14,
    feedback: "Good job!"
  },
  {
    id: 8,
    title: "第8周 - 閱讀理解",
    subtitle: "短篇故事問題",
    subject: "指讀",
    submittedDate: "25/7/2025",
    score: 7,
    status: "graded",
    difficulty: "Medium",
    pointsEarned: 11,
    feedback: "Good job!"
  },
  {
    id: 7,
    title: "第7周 - 詞彙建構",
    subtitle: "新詞練習",
    subject: "詞彙",
    submittedDate: "18/7/2025",
    score: 10,
    status: "graded",
    difficulty: "Easy",
    pointsEarned: 16
  },
  {
    id: 6,
    title: "第6周 - 語法基礎",
    subtitle: "句子結構",
    subject: "常見詞",
    submittedDate: "11/7/2025",
    score: 8,
    status: "graded",
    difficulty: "Medium",
    pointsEarned: 13,
    feedback: "Good job!"
  },
  {
    id: 5,
    title: "第5周 - 拼寫練習",
    subtitle: "常用詞測試",
    subject: "字母",
    submittedDate: "4/7/2025",
    score: 9,
    status: "graded",
    difficulty: "Easy",
    pointsEarned: 14,
    feedback: "Good job!"
  },
  {
    id: 4,
    title: "第4周 - 故事寫作",
    subtitle: "創意寫作",
    subject: "指讀",
    submittedDate: "27/6/2025",
    score: 6,
    status: "graded",
    difficulty: "Hard",
    pointsEarned: 10,
    feedback: "Good job!"
  },
  {
    id: 3,
    title: "第3周 - 字母聲音",
    subtitle: "語音練習",
    subject: "語音意識",
    submittedDate: "20/6/2025",
    score: 9,
    status: "graded",
    difficulty: "Easy",
    pointsEarned: 15,
    feedback: "Good job!"
  },
  {
    id: 2,
    title: "第2周 - 基礎閱讀",
    subtitle: "簡單句子",
    subject: "詞彙",
    submittedDate: "13/6/2025",
    score: 8,
    status: "graded",
    difficulty: "Easy",
    pointsEarned: 13,
    feedback: "Good job!"
  }
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
  const previousAssignments = i18n.language === 'zh' ? previousAssignmentsZh : previousAssignmentsEn

  // Drawer state
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentDetail | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedPreviousAssignment, setSelectedPreviousAssignment] = useState<PreviousAssignment | null>(null)
  const [previousDrawerOpen, setPreviousDrawerOpen] = useState(false)
  const [isAssignmentCompleted, setIsAssignmentCompleted] = useState(false)
  const [assignmentFiles, setAssignmentFiles] = useState<{id: string, name: string, type: string, dataUrl: string}[]>([])  // Store uploaded files array
  const [assignmentScore, setAssignmentScore] = useState<number | null>(null)
  const [assignmentFeedback, setAssignmentFeedback] = useState('')
  const [registrationStatuses, setRegistrationStatuses] = useState<{[key: number]: boolean}>({})

  useEffect(() => {
    // Check if assignment 1 is completed
    const storedFiles = localStorage.getItem(`assignment_files_1`)
    if (storedFiles) {
      try {
        const parsedFiles = JSON.parse(storedFiles)
        setIsAssignmentCompleted(true)
        setAssignmentFiles(parsedFiles)
      } catch (error) {
        console.error('Error parsing stored files:', error)
      }
    }

    // Check if assignment 1 is graded
    const assignmentGrade = localStorage.getItem(`assignment_1_grade`)
    if (assignmentGrade) {
      setAssignmentScore(Number(assignmentGrade))
    }

    // Check if assignment 1 is feedback
    const assignmentFeedback = localStorage.getItem(`assignment_1_feedback`)
    if (assignmentFeedback) {
      setAssignmentFeedback(assignmentFeedback)
    }

    // Load registration statuses for all assignments
    const newRegistrationStatuses: {[key: number]: boolean} = {}
    assignmentDetails.forEach((assignment) => {
      const isInterestAssignment = assignment.buttonText.toLowerCase().includes('interest') || 
                                  assignment.buttonText.includes('興趣')
      if (isInterestAssignment) {
        const registrationStatus = localStorage.getItem(`assignment_registration_${assignment.id}`)
        newRegistrationStatuses[assignment.id] = registrationStatus === 'true'
      }
    })
    setRegistrationStatuses(newRegistrationStatuses)
  }, [])


  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 bg-green-50';
    if (score >= 7) return 'text-blue-600 bg-blue-50';
    if (score >= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  // Helper function to get assignment title with registration status
  const getAssignmentDisplayTitle = (task: any) => {
    const isInterestAssignment = task.buttonText?.toLowerCase().includes('interest') || 
                                task.buttonText?.includes('興趣')
    const isRegistered = registrationStatuses[task.id]
    
    if (isInterestAssignment && isRegistered) {
      return `${task.title} (${t('assignmentDetail.registered')})`
    }
    return task.title
  };

  // Helper function to get subject icon color
  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'sight words':
      case '常見詞':
        return 'bg-blue-500';
      case 'vocabulary':
      case '詞彙':
        return 'bg-purple-500';
      case 'phonemic awareness':
      case '語音意識':
        return 'bg-green-500';
      case 'alphabet':
      case '字母':
        return 'bg-orange-500';
      case 'point-and-read':
      case '指讀':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

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

  const handlePreviousAssignmentClick = (assignmentId: number) => {
    // Convert the basic assignment data to full PreviousAssignment format
    const basicAssignment = previousAssignments.find(a => a.id === assignmentId)
    if (basicAssignment) {
      const fullAssignment: PreviousAssignment = {
        ...basicAssignment,
        status: basicAssignment.status as 'graded' | 'pending' | 'returned',
        difficulty: basicAssignment.difficulty as 'Easy' | 'Medium' | 'Hard',
        submissionFiles: basicAssignment.id === 11 ? [
          { id: "1", name: "sight_words_worksheet.pdf", type: "application/pdf", url: "/files/sight_words.pdf" },
          { id: "2", name: "reading_practice.jpg", type: "image/jpeg", url: "/files/reading.jpg" }
        ] : basicAssignment.id === 10 ? [
          { id: "3", name: "handwriting_practice.jpg", type: "image/jpeg", url: "/files/handwriting.jpg" }
        ] : undefined,
        rubric: basicAssignment.id === 11 ? [
          { criteria: "Word Recognition", score: 9, maxScore: 10, feedback: "Excellent recognition of all sight words" },
          { criteria: "Reading Fluency", score: 8, maxScore: 10, feedback: "Good pace, work on expression" }
        ] : basicAssignment.id === 10 ? [
          { criteria: "Letter Formation", score: 8, maxScore: 10, feedback: "Good letter shapes" },
          { criteria: "Spacing", score: 6, maxScore: 10, feedback: "Work on consistent spacing" }
        ] : undefined,
        timeSpent: "25 minutes",
        completionDate: basicAssignment.submittedDate,
        teacherComments: basicAssignment.feedback
      }
      setSelectedPreviousAssignment(fullAssignment)
      setPreviousDrawerOpen(true)
    }
  }

  const handleSubmittedAssignmentClick = () => {
    // Convert the basic assignment data to full PreviousAssignment format
    const basicAssignment = assignmentDetails[0]
    if (basicAssignment) {
      const fullAssignment: PreviousAssignment = {
        ...basicAssignment,
        status: isAssignmentCompleted ? 'graded' : 'pending',
        difficulty: 'Easy',
        submissionFiles: assignmentFiles.length > 0 ? assignmentFiles.map(file => ({
          id: file.id,
          name: file.name,
          type: file.type,
          url: file.dataUrl
        })) : undefined,
        rubric: basicAssignment.id === 11 ? [
          { criteria: "Word Recognition", score: 9, maxScore: 10, feedback: "Excellent recognition of all sight words" },
          { criteria: "Reading Fluency", score: 8, maxScore: 10, feedback: "Good pace, work on expression" }
        ] : basicAssignment.id === 10 ? [
          { criteria: "Letter Formation", score: 8, maxScore: 10, feedback: "Good letter shapes" },
          { criteria: "Spacing", score: 6, maxScore: 10, feedback: "Work on consistent spacing" }
        ] : undefined,
        timeSpent: "25 minutes",
        submittedDate: new Date().toLocaleDateString(),
        score: assignmentScore,
        pointsEarned: 10,
        teacherComments: assignmentFeedback
      }
      setSelectedPreviousAssignment(fullAssignment)
      setPreviousDrawerOpen(true)
    }
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
    setIsAssignmentCompleted(true)
  }



  return (
    <div className={`min-h-screen bg-gray-50 ${isLarge ? 'min-text-lg text-lg' : ''}`}>
      <div className="max-w-md mx-auto px-6 space-y-5">
        {/* Swipeable Progress Card */}
        <SwipeableProgressCard />

        {/* Urgent Assignment Card */}
        { weeklyTasks[0] && !isAssignmentCompleted && (
        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{t('dashboard.overview.deadlineReminder')}</span>
              <div className="ml-auto bg-black/20 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">20:38</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-3 leading-tight">
              {getAssignmentDisplayTitle(weeklyTasks[0]) || "Upload Worksheet"}
            </h2>
            
            <p className="text-purple-100 text-sm mb-4">
              {weeklyTasks[0]?.subtitle || "Week 12 - Alphabet Practice"}
            </p>
            {weeklyTasks[0] && !weeklyTasks[0].completed && (
                      <Button
                        size="sm"
                        onClick={() => {
                          handleUploadClick()
                          handleAssignmentClick(weeklyTasks[0].id)
                        }}
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
        )}

        {/* Current Assignments Section */}
              <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">{t('dashboard.overview.activeAssignments')}</h2>
            <span className="text-gray-500 text-sm">{t('dashboard.overview.tasks')}</span>
                  </div>
          
          <div className="grid gap-4">
            {/* Remaining Weekly Tasks (skip the first one as it's in the urgent card) */}
            {weeklyTasks.slice(1).map((task, index) => {
              const actualIndex = index + 1; // Since we're starting from the second task
              const TaskIcon = task.icon;
              
              // Determine icon background color based on task type
              let iconBgColor = "bg-green-400";
              
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
                        {getAssignmentDisplayTitle(task)}
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

        {/* Previous Assignments Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">{t('assignments.previousAssignments.title')}</h2>
            <span className="text-gray-500 text-sm">{t('assignments.previousAssignments.completed')}</span>
          </div>
          
          <div className="grid gap-3">
            {isAssignmentCompleted && (
                <div 
                key={weeklyTasks[0].id} 
                className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => handleSubmittedAssignmentClick()}
              >
                <div className="flex items-center justify-between">
                  {/* Left side: Assignment info */}
                  <div className="flex items-center gap-3 flex-1">
                    {/* Subject indicator */}
                    <div className={`w-3 h-12 ${getSubjectColor(weeklyTasks[0].subject)} rounded-full flex-shrink-0`}></div>
                    
                    {/* Assignment details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {getAssignmentDisplayTitle(weeklyTasks[0])}
                      </h3>
                      <p className="text-gray-500 text-xs truncate">
                        {weeklyTasks[0].subtitle}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">
                          {t('assignments.previousAssignments.submitted')}: {new Date().toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          {weeklyTasks[0].subject}
                        </span>
                      </div>
                      
                      {/* File preview thumbnails */}
                      {assignmentFiles.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">{t('previousAssignment.submittedFiles')}:</span>
                          <div className="flex gap-1">
                            {assignmentFiles.slice(0, 3).map((file, index) => (
                              <div key={file.id} className="w-6 h-6 bg-gray-100 rounded border overflow-hidden">
                                {file.type.startsWith('image/') ? (
                                  <img 
                                    src={file.dataUrl} 
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <FileText className="w-3 h-3 text-gray-500" />
                                  </div>
                                )}
                              </div>
                            ))}
                            {assignmentFiles.length > 3 && (
                              <div className="w-6 h-6 bg-gray-100 rounded border flex items-center justify-center">
                                <span className="text-xs text-gray-500">+{assignmentFiles.length - 3}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side: Score and points */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Points earned */}
                    <div className="text-right">
                      <div className="text-xs text-gray-500">
                        {t('assignments.previousAssignments.points')}
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        +{weeklyTasks[0].pointReward}
                      </div>
                    </div>

                    {/* Score badge */}
                    { assignmentScore !== null ? (
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(assignmentScore)}`}>
                        {assignmentScore}/10
                      </div>
                    ) : (
                      <div className="px-3 py-1 rounded-full text-sm font-semibold text-gray-500 bg-gray-50">
                        N/A
                      </div>
                    )}

                    {/* Arrow */}
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
            {previousAssignments.map((assignment, index) => {
              // Helper function to get score color based on performance
              const getScoreColor = (score: number) => {
                if (score >= 9) return 'text-green-600 bg-green-50';
                if (score >= 7) return 'text-blue-600 bg-blue-50';
                if (score >= 5) return 'text-yellow-600 bg-yellow-50';
                return 'text-red-600 bg-red-50';
              };

              // Helper function to get subject icon color
              const getSubjectColor = (subject: string) => {
                switch (subject.toLowerCase()) {
                  case 'sight words':
                  case '常見詞':
                    return 'bg-blue-500';
                  case 'vocabulary':
                  case '詞彙':
                    return 'bg-purple-500';
                  case 'phonemic awareness':
                  case '語音意識':
                    return 'bg-green-500';
                  case 'alphabet':
                  case '字母':
                    return 'bg-orange-500';
                  case 'point-and-read':
                  case '指讀':
                    return 'bg-red-500';
                  default:
                    return 'bg-gray-500';
                }
              };

              return (
                <div 
                  key={assignment.id} 
                  className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => handlePreviousAssignmentClick(assignment.id)}
                >
                  <div className="flex items-center justify-between">
                    {/* Left side: Assignment info */}
                    <div className="flex items-center gap-3 flex-1">
                      {/* Subject indicator */}
                      <div className={`w-3 h-12 ${getSubjectColor(assignment.subject)} rounded-full flex-shrink-0`}></div>
                      
                      {/* Assignment details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {assignment.title}
                        </h3>
                        <p className="text-gray-500 text-xs truncate">
                          {assignment.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">
                            {t('assignments.previousAssignments.submitted')}: {assignment.submittedDate}
                          </span>
                          <span className="text-xs text-gray-300">•</span>
                          <span className="text-xs text-gray-500">
                            {assignment.subject}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Score and points */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* Points earned */}
                      <div className="text-right">
                        <div className="text-xs text-gray-500">
                          {t('assignments.previousAssignments.points')}
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          +{assignment.pointsEarned}
                        </div>
                      </div>

                      {/* Score badge */}
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(assignment.score)}`}>
                        {assignment.score}/10
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
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
                              I loved seeing you identify <span className="font-semibold">"see"</span> and <span className="font-semibold">"cat"</span> so quickly! You're really getting the hang of these sight words.
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
                              Let's work on the word <span className="font-semibold">"the"</span> - I noticed you hesitated a few times. Try practicing this sight word with flashcards or by finding it in your favorite books!
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
                              Your reading confidence is growing! I can see you're taking your time to sound out words carefully. Keep up the great work with your phonics skills.
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

      {/* Previous Assignment Detail Drawer */}
      <PreviousAssignmentDetailDrawer
        assignment={selectedPreviousAssignment}
        open={previousDrawerOpen}
        onOpenChange={setPreviousDrawerOpen}
      />
    </div>
  )
}