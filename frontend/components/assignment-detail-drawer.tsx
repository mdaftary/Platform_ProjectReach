"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
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
  User,
  Trash2,
  Plus,
  Eye
} from "lucide-react"
import { useTranslation } from "react-i18next"

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
  buttonText: string
  pointReward: number 
}

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  dataUrl: string
  preview?: string
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
  // Early return must be before any hooks
  if (!assignment) return null

  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [showFileUpload, setShowFileUpload] = useState(false)

  const TaskIcon = assignment.icon

  // Check if this assignment requires file upload
  const isUploadAssignment = assignment.buttonText.toLowerCase().includes('upload') || 
                           assignment.buttonText.includes('上傳')

  // Load uploaded files from localStorage on component mount
  useEffect(() => {
    if (isUploadAssignment && assignment) {
      const savedFiles = localStorage.getItem(`assignment_files_${assignment.id}`)
      if (savedFiles) {
        setUploadedFiles(JSON.parse(savedFiles))
      }
    }
  }, [assignment, isUploadAssignment])

  // Save files to localStorage whenever uploadedFiles changes
  useEffect(() => {
    if (assignment && uploadedFiles.length > 0) {
      localStorage.setItem(`assignment_files_${assignment.id}`, JSON.stringify(uploadedFiles))
    }
  }, [uploadedFiles, assignment])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      case 'Hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      // Validate file type (images and PDFs only)
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
      if (!validTypes.includes(file.type)) {
        alert(t("assignmentDetail.fileTypeError"))
        return
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(t("assignmentDetail.fileSizeError"))
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        const newFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: reader.result as string
        }

        setUploadedFiles(prev => [...prev, newFile])
        setShowFileUpload(true)
      }
      reader.readAsDataURL(file)
    })

    // Reset file input
    if (event.target) {
      event.target.value = ''
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleConfirmUpload = () => {
    if (uploadedFiles.length > 0) {
      // Mark assignment as completed
      onComplete?.(assignment.id)
      setShowFileUpload(false)
      // Show success message
      alert(t("assignmentDetail.uploadSuccess"))
    }
  }

  const handleMainButtonClick = () => {
    if (isUploadAssignment) {
      if (uploadedFiles.length > 0) {
        setShowFileUpload(true)
      } else {
        handleFileSelect()
      }
    } else {
      onComplete?.(assignment.id)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
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
                  {t(`assignmentDetail.difficulty.${assignment.difficulty}`)}
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
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{t("assignmentDetail.dueDate")}: {assignment.dueDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{assignment.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{t("assignmentDetail.pointReward")}: {assignment.pointReward}</span>
                </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">{t("assignmentDetail.description")}</h3>
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
                  <h3 className="font-semibold text-gray-900">{t("assignmentDetail.learningObjectives")}</h3>
                </div>
                <ul className="space-y-2">
                  {assignment.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
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
                  <h3 className="font-semibold text-gray-900">{t("assignmentDetail.materials")}</h3>
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
                  <h3 className="font-semibold text-gray-900">{t("assignmentDetail.instructions")}</h3>
                </div>
                <ol className="space-y-3">
                  {assignment.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
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

        {/* File Upload Interface */}
        {isUploadAssignment && showFileUpload && (
          <div className="border-t border-gray-100 bg-gray-50/50 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{t("assignmentDetail.uploadedFiles")}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFileSelect}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {t("assignmentDetail.addMoreFiles")}
                </Button>
              </div>

              {/* File Preview Grid */}
              <div className="grid grid-cols-1 gap-3 max-h-40 overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                    {/* File Preview */}
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {file.type.startsWith('image/') ? (
                        <img 
                          src={file.dataUrl} 
                          alt={file.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <FileText className="w-6 h-6 text-red-500" />
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>

                    {/* File Actions */}
                    <div className="flex items-center gap-2">
                      {file.type.startsWith('image/') && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 h-8 w-8"
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
                                src={file.dataUrl} 
                                alt={file.name}
                                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="p-1 h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Confirm Upload Button */}
              <div className="flex gap-3 pt-2 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowFileUpload(false)}
                  className="flex-1"
                >
                  {t("assignmentDetail.cancel")}
                </Button>
                <Button
                  onClick={handleConfirmUpload}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  disabled={uploadedFiles.length === 0}
                >
                  {t("assignmentDetail.confirmUpload")} ({uploadedFiles.length} {uploadedFiles.length !== 1 ? t("assignmentDetail.files") : t("assignmentDetail.file")})
                </Button>
              </div>
            </div>
          </div>
        )}

        <DrawerFooter className="border-t border-gray-100 bg-gray-50/50">
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              onClick={handleMainButtonClick}
            >
              {isUploadAssignment && uploadedFiles.length > 0 ? t("assignmentDetail.viewUploadedFiles") : assignment.buttonText}
            </Button>
          </div>
        </DrawerFooter>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </DrawerContent>
    </Drawer>
  )
}
