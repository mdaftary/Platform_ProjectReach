"use client"

import { useState } from "react"
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Calendar,
  Clock,
  CheckCircle2,
  Star,
  Trophy,
  FileText,
  X,
  Download,
  Eye,
  MessageSquare,
  Award
} from "lucide-react"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next"

export interface PreviousAssignment {
  id: number
  title: string
  subtitle: string
  subject: string
  submittedDate: string
  score: number | null
  status: 'graded' | 'pending' | 'returned'
  difficulty: 'Easy' | 'Medium' | 'Hard'
  pointsEarned: number
  feedback?: string
  submissionFiles?: {
    id: string
    name: string
    type: string
    url: string
  }[]
  rubric?: {
    criteria: string
    score: number
    maxScore: number
    feedback: string
  }[]
  teacherComments?: string
  timeSpent?: string
  completionDate?: string
}

interface PreviousAssignmentDetailDrawerProps {
  assignment: PreviousAssignment | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PreviousAssignmentDetailDrawer({
  assignment,
  open,
  onOpenChange
}: PreviousAssignmentDetailDrawerProps) {
  // Early return must be before any hooks
  if (!assignment) return null

  const { t } = useTranslation()

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      case 'Hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 7) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (score >= 5) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getPerformanceLevel = (score: number) => {
    if (score >= 9) return t("previousAssignment.performance.excellent")
    if (score >= 7) return t("previousAssignment.performance.good")
    if (score >= 5) return t("previousAssignment.performance.satisfactory")
    return t("previousAssignment.performance.needsImprovement")
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <DrawerTitle className="text-xl font-bold text-gray-900 text-left">
                {assignment.title}
              </DrawerTitle>
              <DrawerDescription className="text-gray-600 mt-1 text-left">
                {assignment.subtitle}
              </DrawerDescription>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  {assignment.subject}
                </Badge>
                <Badge className={`text-xs ${getDifficultyColor(assignment.difficulty)}`}>
                  {t(`assignmentDetail.difficulty.${assignment.difficulty}`)}
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 text-xs">
                  <Trophy className="w-3 h-3 mr-1" />
                  {t("previousAssignment.completed")}
                </Badge>
              </div>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Score and Performance Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="text-center">
                  {assignment.score ? (
                    <div className={`text-2xl font-bold ${getScoreColor(assignment.score).split(' ')[0]}`}>
                      {assignment.score}/10
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-gray-500">
                      N/A
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {t("previousAssignment.finalScore")}
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    +{assignment.pointsEarned}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t("previousAssignment.pointsEarned")}
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">
                    {assignment.score ? getPerformanceLevel(assignment.score) : 'N/A'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t("previousAssignment.performance.label")}
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">
                    {assignment.submittedDate}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t("previousAssignment.submittedDate")}
                  </div>
                </div>
              </Card>
            </div>

            {/* Submitted Files */}
            {assignment.submissionFiles && assignment.submissionFiles.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">{t("previousAssignment.submittedFiles")}</h3>
                  </div>
                  <div className="space-y-2">
                    {assignment.submissionFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {file.type.startsWith('image/') ? (
                              <img 
                                src={file.url} 
                                alt={file.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <FileText className="w-6 h-6 text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-gray-900 block truncate">{file.name}</span>
                            <span className="text-xs text-gray-500">{file.type}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {file.type.startsWith('image/') && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-700"
                                  aria-label={t("assignmentDetail.previewImage")}
                                  title={t("assignmentDetail.previewImage")}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                                <DialogHeader className="p-6 pb-0">
                                  <DialogTitle className="text-left">{file.name}</DialogTitle>
                                </DialogHeader>
                                <div className="flex items-center justify-center p-6 pt-2">
                                  <img 
                                    src={file.url} 
                                    alt={file.name}
                                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            <Download className="w-4 h-4 mr-1" />
                            {t("previousAssignment.download")}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Rubric Breakdown */}
            {assignment.rubric && assignment.rubric.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">{t("previousAssignment.rubric")}</h3>
                  </div>
                  <div className="space-y-3">
                    {assignment.rubric.map((criteria, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900">{criteria.criteria}</h4>
                          <span className={`text-sm font-semibold ${getScoreColor(criteria.score).split(' ')[0]}`}>
                            {criteria.score}/{criteria.maxScore}
                          </span>
                        </div>
                        {criteria.feedback && (
                          <p className="text-xs text-gray-600">{criteria.feedback}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Teacher Feedback */}
            {(assignment.feedback || assignment.teacherComments) && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">{t("previousAssignment.teacherFeedback")}</h3>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">
                      {assignment.feedback || assignment.teacherComments}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Assignment Timeline */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">{t("previousAssignment.timeline")}</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  {assignment.completionDate && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>{t("previousAssignment.completed")}: {assignment.completionDate}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>{t("previousAssignment.submitted")}: {assignment.submittedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DrawerFooter className="border-t border-gray-100 bg-gray-50/50">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              {t("previousAssignment.downloadAll")}
            </Button>
            <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
              <Star className="w-4 h-4 mr-2" />
              {t("previousAssignment.reviewSimilar")}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
