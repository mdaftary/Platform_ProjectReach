"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Play, CheckCircle2, Circle, User, Eye, ChevronRight, X, Check, AlertCircle, Download, ArrowRight, Loader, Flame, Clock, Star } from "lucide-react"
import Link from "next/link"
import { useFontSize } from "@/app/font-size-provider"

// Weekly tasks data
const weeklyTasks = [
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

// Progress categories data
const progressCategories = [
  { name: "Alphabet", progress: 85, color: "text-green-600", barColor: "bg-green-500" },
  { name: "Sight Words", progress: 72, color: "text-blue-600", barColor: "bg-blue-500" },
  { name: "Vocabulary", progress: 68, color: "text-blue-600", barColor: "bg-blue-400" },
  { name: "Phonemic Awareness", progress: 79, color: "text-green-600", barColor: "bg-green-400" },
  { name: "Point-and-Read", progress: 91, color: "text-green-600", barColor: "bg-green-500" },
]

export default function HomePage() {
  const { isLarge } = useFontSize()
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

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

  return (
    <div className={`min-h-screen bg-gray-50 ${isLarge ? 'min-text-lg text-lg' : ''}`}>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-md mx-auto px-6 py-6">
          {/* REACH Logo */}
          <div className="flex justify-center mb-4">
            <img src="/reach-logo.webp" alt="REACH Hong Kong" className="h-8 w-auto opacity-90" />
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Emma's Learning Journey
              </h1>
              <p className="text-base text-gray-500 mt-1 font-medium">
                Grade K3 • Parent Dashboard
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center ml-4">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Weekly Tasks */}
        <div className="space-y-3">
          <h2 className={`${isLarge ? 'text-2xl' : 'text-lg'} font-semibold text-gray-900 tracking-tight`}>This Week</h2>
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {weeklyTasks.map((task, index) => (
                  <div key={task.id} className={`p-4 flex gap-4 ${task.isPrimary && !task.completed ? 'bg-blue-50/50' : ''} ${isLarge ? "flex-col" : ""}`}>
                    { !isLarge && (
                      <div>
                    <div className="flex-shrink-0">
                    {task.completed ? (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white stroke-2" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                  </div>
                    )}
                    <div className={`flex-1 min-w-0 `}>
                      <p className={`${isLarge ? 'text-lg' : 'text-sm'} font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {task.subtitle}
                      </p>
                    </div>
                    {task.isPrimary && !task.completed && (
                      <Button 
                        size="sm" 
                        onClick={handleUploadClick}
                        className="bg-blue-500 hover:bg-blue-600 text-white border-0 px-4 py-2 text-sm font-semibold rounded-xl shadow-sm"
                      >
                        <task.icon className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    )}
                    {(!task.isPrimary && !isLarge) && (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights - Priority Section */}
        <div className="space-y-3">
          <h2 className={`${isLarge ? 'text-2xl' : 'text-lg'} font-semibold text-gray-900 tracking-tight`}>AI Insights</h2>
          <Card className="bg-white/65 backdrop-blur-xl border border-white/30 shadow-lg">
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Eye className="w-5 h-5 text-blue-600 stroke-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 leading-relaxed">
                      Emma reversed <span className="font-semibold">b</span> and <span className="font-semibold">d</span> in yesterday's worksheet. Try 5 minutes of extra practice.
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-100/60 pt-3 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-bl-200 text-gray-700 hover:bg-gray-50 text-xs font-medium rounded-lg px-4 py-2"
                  >
                    View Exercises
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Snapshot */}
        <div className="space-y-3">
          <h2 className={`${isLarge ? 'text-2xl' : 'text-lg'} font-semibold text-gray-900 tracking-tight`}>Progress Snapshot</h2>
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className={`p-5 ${isLarge ? 'text-lg' : ''}`}>
              <div className="space-y-4">
                {progressCategories.map((category, index) => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className={`${isLarge ? 'text-xl' : 'text-sm'} font-medium text-gray-900`}>{category.name}</p>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        {!isLarge && (
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${category.barColor}`}
                              style={{ width: `${category.progress}%` }}
                            />
                          </div>
                        )}
                        <span className={`${isLarge ? 'text-xl min-w-[40px]' : 'text-xs min-w-[32px]'} font-semibold tabular-nums ${category.color} text-right`}>
                          {category.progress}%
                        </span>
                      </div>
                    </div>
                    {index < progressCategories.length - 1 && (
                      <div className="border-b border-gray-100/50 mt-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className={`grid ${isLarge ? 'grid-cols-1' : 'grid-cols-3'} gap-3`}>
          <div className="duolingo-gradient-light rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full duolingo-gradient-primary flex items-center justify-center shadow">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-2xl font-extrabold text-gray-900 tabular-nums">12</div>
                <div className="text-xs text-gray-700 mt-0.5">Days Streak</div>
              </div>
            </div>
          </div>
          <div className="duolingo-gradient-light rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full duolingo-gradient-success flex items-center justify-center shadow">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-2xl font-extrabold text-gray-900 tabular-nums">2.5h</div>
                <div className="text-xs text-gray-700 mt-0.5">Activity Hours</div>
              </div>
            </div>
          </div>
          <div className="duolingo-gradient-light rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full duolingo-gradient-primary flex items-center justify-center shadow">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-2xl font-extrabold text-gray-900 tabular-nums">847</div>
                <div className="text-xs text-gray-700 mt-0.5">Stars Earned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom padding for navigation */}
        <div className="h-20"></div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
              <h2 className="text-xl font-bold text-gray-900">Upload Worksheet</h2>
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
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Loader className="w-8 h-8 text-blue-600 animate-spin stroke-2" />
                    </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Uploading...</p>
                    <p className="text-sm text-gray-500 mt-1">Processing your worksheet</p>
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
                        <p className="font-semibold text-green-900">Worksheet uploaded successfully</p>
                        <p className="text-sm text-green-700">Week 12 - Alphabet Practice</p>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Image Preview */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Uploaded Worksheet</h3>
                    <div className="bg-gray-100 rounded-2xl p-4 aspect-[4/3] flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Camera className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Worksheet Preview</p>
                        <p className="text-xs">Sight word circling task</p>
                      </div>
                    </div>
                  </div>

                  {/* OCR Processing */}
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Loader className="w-6 h-6 text-blue-600 animate-spin stroke-2" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Analyzing handwriting and answers...</p>
                      <p className="text-sm text-gray-500 mt-1">This usually takes 30-60 seconds</p>
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
                        <p className="font-semibold text-green-900">Analysis complete</p>
                        <p className="text-sm text-green-700">Emma's worksheet has been reviewed</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bump */}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white stroke-2" />
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">Progress Updated</p>
                        <p className="text-sm text-blue-700">+2% Vocabulary Progress • +1% Phonemic Awareness</p>
                      </div>
                    </div>
                  </div>

                  {/* AI Feedback Card */}
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardContent className="p-5">
                      <div className="space-y-5">
                        <h3 className="text-lg font-bold text-gray-900">AI Feedback</h3>
                        
                        {/* What Went Well Section */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 stroke-2" />
                            <h4 className="text-sm font-semibold text-green-800">What Went Well</h4>
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
                            <h4 className="text-sm font-semibold text-orange-800">Needs Practice</h4>
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
                            <Eye className="w-4 h-4 text-blue-600 stroke-2" />
                            <h4 className="text-sm font-semibold text-blue-800">General Notes</h4>
                          </div>
                          <div className="bg-blue-50/50 rounded-xl p-3">
                            <p className="text-sm text-gray-900 leading-relaxed">
                              Good tracing, but spacing between <span className="font-semibold">"p"</span> and <span className="font-semibold">"a"</span> in "panda" needs work.
                            </p>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 pt-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Suggested Next Steps</h4>
                          
                          <div className="space-y-3">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-xl font-semibold">
                              <ArrowRight className="w-4 h-4 mr-2 stroke-2" />
                              View Recommended Practice
                            </Button>
                            
                            <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                              <Download className="w-4 h-4 stroke-2" />
                              Download extra worksheet (PDF)
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Close Button */}
                  <Button 
                    onClick={closeModal}
                    variant="outline"
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold"
                  >
                    Done
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}