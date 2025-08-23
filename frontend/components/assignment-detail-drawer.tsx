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
  FileText,
  Target,
  BookOpen,
  X,
  PlayCircle,
  Upload,
  User
} from "lucide-react"

export interface AssignmentDetail {
  id: number
  title: string
  subtitle: string
  description: string
  subject: string
  dueDate: string
  estimatedTime: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  objectives: string[]
  materials: string[]
  instructions: string[]
  completed: boolean
  icon: any
}

interface AssignmentDetailDrawerProps {
  assignment: AssignmentDetail | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete?: (assignmentId: number) => void
}

export function AssignmentDetailDrawer({
  assignment,
  open,
  onOpenChange,
  onComplete
}: AssignmentDetailDrawerProps) {
  if (!assignment) return null

  const TaskIcon = assignment.icon

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      case 'Hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <TaskIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <DrawerTitle className="text-xl font-bold text-gray-900 text-left">
                {assignment.title}
              </DrawerTitle>
              <DrawerDescription className="text-gray-600 mt-1 text-left">
                {assignment.subtitle}
              </DrawerDescription>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="secondary" className="text-xs">
                  {assignment.subject}
                </Badge>
                <Badge className={`text-xs ${getDifficultyColor(assignment.difficulty)}`}>
                  {assignment.difficulty}
                </Badge>
                {assignment.completed && (
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
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
            {/* Assignment Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Due: {assignment.dueDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{assignment.estimatedTime}</span>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Description</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {assignment.description}
                </p>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Learning Objectives</h3>
                </div>
                <ul className="space-y-2">
                  {assignment.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Materials Needed */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Materials Needed</h3>
                </div>
                <ul className="space-y-2">
                  {assignment.materials.map((material, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Instructions</h3>
                </div>
                <ol className="space-y-3">
                  {assignment.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>

        <DrawerFooter className="border-t border-gray-100 bg-gray-50/50">
          <div className="flex gap-3">
            {!assignment.completed ? (
              <>
                <Button 
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => onComplete?.(assignment.id)}
                >
                  {assignment.icon === Upload ? (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Work
                    </>
                  ) : assignment.icon === PlayCircle ? (
                    <>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start Video
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark Complete
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
              </>
            ) : (
              <Button className="flex-1" variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
