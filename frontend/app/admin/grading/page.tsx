"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  FileText, 
  Clock, 
  User, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Eye,
  Save,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Star,
  Trash2
} from "lucide-react"
import Link from "next/link"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"

// Mock assignment submission data
const MOCK_SUBMISSIONS = [
  {
    id: "sub_001",
    studentName: "Emma Chen",
    studentId: "st_001",
    assignmentTitle: "K3 Alphabet Recognition - Week 12",
    assignmentId: "assign_001",
    submittedAt: "2024-01-15T14:30:00Z",
    files: [
      {
        id: "file_001",
        name: "alphabet_worksheet.jpg",
        type: "image",
        url: "/placeholder.jpg",
        scanResults: {
          accuracy: 85,
          detectedAnswers: 18,
          totalQuestions: 20,
          confidence: "high"
        }
      }
    ],
    status: "pending" as const,
    currentScore: null,
    feedback: "",
    autoScanFeedback: "Student correctly identified 18 out of 20 letters. Struggled with lowercase 'b' and 'd' discrimination.",
    dueDate: "2024-01-15T18:00:00Z",
    subject: "English"
  },
  {
    id: "sub_002", 
    studentName: "Lucas Wong",
    studentId: "st_002",
    assignmentTitle: "Sight Words Practice - Set 1",
    assignmentId: "assign_002",
    submittedAt: "2024-01-15T16:45:00Z",
    files: [
      {
        id: "file_002",
        name: "sight_words_exercise.jpg",
        type: "image", 
        url: "/placeholder.jpg",
        scanResults: {
          accuracy: 92,
          detectedAnswers: 23,
          totalQuestions: 25,
          confidence: "high"
        }
      }
    ],
    status: "graded" as const,
    currentScore: 9,
    feedback: "Excellent work! Great improvement in sight word recognition. Keep practicing 'where' and 'there' - they can be tricky!",
    autoScanFeedback: "Strong performance across most sight words. Minor confusion between similar words.",
    dueDate: "2024-01-15T18:00:00Z", 
    subject: "English"
  },
  {
    id: "sub_003",
    studentName: "Sophia Li", 
    studentId: "st_003",
    assignmentTitle: "Phonics Blending Exercise",
    assignmentId: "assign_003",
    submittedAt: "2024-01-15T15:20:00Z",
    files: [
      {
        id: "file_003",
        name: "phonics_blend.jpg",
        type: "image",
        url: "/placeholder.jpg",
        scanResults: {
          accuracy: 78,
          detectedAnswers: 14,
          totalQuestions: 18,
          confidence: "medium"
        }
      }
    ],
    status: "pending" as const,
    currentScore: null,
    feedback: "",
    autoScanFeedback: "Good understanding of basic blends. Needs more practice with consonant clusters.",
    dueDate: "2024-01-15T18:00:00Z",
    subject: "English"
  }
]

export default function AdminGradingPage() {
  const { t } = useTranslation('common')
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS)
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null)
  const [gradingScore, setGradingScore] = useState<number>(0)
  const [gradingFeedback, setGradingFeedback] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "graded">("all")
  const [localStorageSubmissions, setLocalStorageSubmissions] = useState<any[]>([])
  const [hasLocalStorageData, setHasLocalStorageData] = useState(false)

  const currentSubmission = submissions.find(s => s.id === selectedSubmission)

  // Check localStorage for assignment data
  useEffect(() => {
    const assignmentFiles = localStorage.getItem('assignment_files_1')
    const assignmentGrade = localStorage.getItem('assignment_1_grade')
    const assignmentFeedback = localStorage.getItem('assignment_1_feedback')

    if (assignmentFiles) {
      setHasLocalStorageData(true)
      try {
        const files = JSON.parse(assignmentFiles)
        const realSubmission = {
          id: "real_sub_001",
          studentName: "Current Student",
          studentId: "real_st_001",
          assignmentTitle: "Week 12 - Alphabet Practice",
          assignmentId: "assign_real_001",
          submittedAt: new Date().toISOString(),
          files: files.map((file: any, index: number) => ({
            id: `real_file_${index}`,
            name: file.name || `File ${index + 1}`,
            type: file.type || "image",
            url: file.url || file.dataUrl || "/placeholder.jpg",
            scanResults: {
              accuracy: 85,
              detectedAnswers: 18,
              totalQuestions: 20,
              confidence: "high"
            }
          })),
          status: assignmentGrade ? "graded" as const : "pending" as const,
          currentScore: assignmentGrade ? Number(assignmentGrade) : null,
          feedback: assignmentFeedback || "",
          autoScanFeedback: "AI analysis: Student has submitted their work and is ready for grading.",
          dueDate: "2024-01-15T18:00:00Z",
          subject: "English"
        }

        // Add real submission to the beginning of the list
        if (localStorageSubmissions.length === 0) {
          // Set submission no duplication (by id)
          setSubmissions(prev => {
            const newSubmissions = [realSubmission as any, ...prev]
            return newSubmissions.filter((submission, index, self) =>
              index === self.findIndex((t) => t.id === submission.id)
            )
          })
          setLocalStorageSubmissions([realSubmission])
        }
      } catch (e) {
        console.error('Error parsing assignment files:', e)
      }
    }
  }, [])

  const filteredSubmissions = submissions.filter(submission => {
    if (filterStatus === "all") return true
    return submission.status === filterStatus
  })

  const handleGradeSubmission = () => {
    if (!selectedSubmission) return
    
    setSubmissions(prev => prev.map(submission => 
      submission.id === selectedSubmission 
        ? { 
            ...submission, 
            status: "graded" as const,
            currentScore: gradingScore,
            feedback: gradingFeedback
          }
        : submission
    ))
    
    // Save to localStorage if this is the real submission
    if (selectedSubmission === "real_sub_001") {
      localStorage.setItem('assignment_1_grade', gradingScore.toString())
      localStorage.setItem('assignment_1_feedback', gradingFeedback)
    }
    
    // Reset form
    setGradingScore(0)
    setGradingFeedback("")
    setSelectedSubmission(null)
  }

  const handleClearData = () => {
    // Clear localStorage data
    localStorage.removeItem('assignment_files_1')
    localStorage.removeItem('assignment_1_grade')
    localStorage.removeItem('assignment_1_feedback')
    
    // Remove real submission from submissions
    setSubmissions(prev => prev.filter(s => s.id !== "real_sub_001"))
    setLocalStorageSubmissions([])
    setHasLocalStorageData(false)
    setSelectedSubmission(null)
    setGradingScore(0)
    setGradingFeedback("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "graded": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high": return "text-green-600"
      case "medium": return "text-yellow-600"
      case "low": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  if (selectedSubmission && currentSubmission) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedSubmission(null)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('admin.grading.backToList')}
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('admin.grading.reviewSubmission')}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {currentSubmission.studentName} • {currentSubmission.assignmentTitle}
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(currentSubmission.status)}>
                {t(`admin.grading.status.${currentSubmission.status}`)}
              </Badge>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Submission Details */}
            <div className="space-y-6">
              {/* Student Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {t('admin.grading.studentInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        {t('admin.grading.studentName')}
                      </Label>
                      <p className="font-semibold">{currentSubmission.studentName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        {t('admin.grading.subject')}
                      </Label>
                      <p className="font-semibold">{currentSubmission.subject}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        {t('admin.grading.submittedAt')}
                      </Label>
                      <p className="font-semibold">
                        {new Date(currentSubmission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        {t('admin.grading.dueDate')}
                      </Label>
                      <p className="font-semibold">
                        {new Date(currentSubmission.dueDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scan Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {t('admin.grading.scanResults')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {currentSubmission.files.map((file) => (
                    <div key={file.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{file.name}</span>
                      </div>

                      {/* Image Preview */}
                      <div>
                        <Label>{t('admin.grading.submissionPreview')}</Label>
                        <div className="mt-2 border rounded-lg overflow-hidden">
                          <img 
                            src={file.url} 
                            alt={file.name}
                            className="w-full h-auto max-h-96 object-contain bg-gray-50"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Grading Interface */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    {t('admin.grading.gradeAssignment')}
                  </CardTitle>
                  <CardDescription>
                    {t('admin.grading.gradeDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Score Input */}
                  <div>
                    <Label htmlFor="score" className="text-base font-medium">
                      {t('admin.grading.score')} ({t('admin.grading.outOf10')})
                    </Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Input
                        id="score"
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={gradingScore}
                        onChange={(e) => setGradingScore(Number(e.target.value))}
                        className="w-24 text-lg font-bold"
                      />
                      <span className="text-gray-500">/ 10</span>
                      {gradingScore > 0 && (
                        <div className="flex">
                          {Array.from({ length: Math.floor(gradingScore) }, (_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          {gradingScore % 1 !== 0 && (
                            <Star className="w-4 h-4 fill-yellow-200 text-yellow-400" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Feedback Textarea */}
                  <div>
                    <Label htmlFor="feedback" className="text-base font-medium">
                      {t('admin.grading.feedback')}
                    </Label>
                    <Textarea
                      id="feedback"
                      placeholder={t('admin.grading.feedbackPlaceholder')}
                      value={gradingFeedback}
                      onChange={(e) => setGradingFeedback(e.target.value)}
                      rows={6}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t('admin.grading.feedbackHint')}
                    </p>
                  </div>

                  {/* Current Grade Display */}
                  {currentSubmission.status === "graded" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">
                        {t('admin.grading.currentGrade')}
                      </h4>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-green-600">
                          {currentSubmission.currentScore}/10
                        </span>
                        <div className="flex">
                          {Array.from({ length: Math.floor(currentSubmission.currentScore || 0) }, (_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      {currentSubmission.feedback && (
                        <p className="text-sm text-green-700">
                          {currentSubmission.feedback}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={handleGradeSubmission}
                      className="flex-1 duolingo-gradient-primary"
                      disabled={gradingScore === 0 || !gradingFeedback.trim()}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {currentSubmission.status === "graded" 
                        ? t('admin.grading.updateGrade')
                        : t('admin.grading.submitGrade')
                      }
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      {t('admin.grading.download')}
                    </Button>
                    {currentSubmission?.id === "real_sub_001" && (
                      <Button 
                        variant="destructive" 
                        onClick={handleClearData}
                        className="px-3"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('admin.grading.quickActions')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      setGradingScore(8.5)
                      setGradingFeedback(t('admin.grading.templates.excellent'))
                    }}
                  >
                    {t('admin.grading.templates.excellentWork')} (8.5/10)
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      setGradingScore(7)
                      setGradingFeedback(t('admin.grading.templates.good'))
                    }}
                  >
                    {t('admin.grading.templates.goodWork')} (7/10)
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      setGradingScore(5)
                      setGradingFeedback(t('admin.grading.templates.needsImprovement'))
                    }}
                  >
                    {t('admin.grading.templates.needsWork')} (5/10)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                {t('admin.grading.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t('admin.grading.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {t('admin.grading.exportGrades')}
              </Button>
              {hasLocalStorageData && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleClearData}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Data
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Real Submission Banner */}
        {hasLocalStorageData && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">New Submission</p>
                  <p className="text-sm text-blue-700">Assignment data loaded - ready for grading</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleClearData}
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('admin.grading.searchSubmissions')}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <Tabs value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
            <TabsList>
              <TabsTrigger value="all">{t('admin.grading.filter.all')}</TabsTrigger>
              <TabsTrigger value="pending">{t('admin.grading.filter.pending')}</TabsTrigger>
              <TabsTrigger value="graded">{t('admin.grading.filter.graded')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('admin.grading.stats.pending')}
                  </p>
                  <p className="text-3xl font-bold text-orange-600">
                    {submissions.filter(s => s.status === "pending").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('admin.grading.stats.graded')}
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {submissions.filter(s => s.status === "graded").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('admin.grading.stats.averageScore')}
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {submissions.filter(s => s.currentScore !== null).length > 0
                      ? (submissions
                          .filter(s => s.currentScore !== null)
                          .reduce((sum, s) => sum + (s.currentScore || 0), 0) / 
                         submissions.filter(s => s.currentScore !== null).length
                        ).toFixed(1)
                      : "—"
                    }
                  </p>
                </div>
                <Star className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions List */}
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.grading.submissionsList')}</CardTitle>
            <CardDescription>
              {t('admin.grading.submissionsListDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <div 
                  key={submission.id} 
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => setSelectedSubmission(submission.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="hidden md:flex w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full items-center justify-center text-white font-bold">
                        {submission.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {submission.assignmentTitle}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {submission.studentName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {submission.files.length} {t('admin.grading.files')}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge className={getStatusColor(submission.status)}>
                            {t(`admin.grading.status.${submission.status}`)}
                          </Badge>
                          {submission.status === "graded" && submission.currentScore !== null && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{submission.currentScore}/10</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        {t('admin.grading.review')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
