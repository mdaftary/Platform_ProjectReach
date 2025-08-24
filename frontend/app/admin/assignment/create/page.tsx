"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Plus, 
  Trash2, 
  Save, 
  Calendar, 
  Clock, 
  Target, 
  BookOpen, 
  User,
  Camera,
  Play,
  Users,
  CheckCircle2,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Icon mapping for different assignment types
const iconMap = {
  Camera,
  Play,
  Users,
  CheckCircle2,
  BookOpen,
  User,
  Target
}

export default function CreateAssignmentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    subject: "",
    dueDate: "",
    estimatedTime: "",
    difficulty: "Easy" as "Easy" | "Medium" | "Hard",
    objectives: [""],
    materials: [""],
    instructions: [""],
    buttonText: "",
    pointReward: 10,
    icon: "Camera"
  })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleInputChange = (field: string, value: string | number) => {
    if (field === 'dueDate') {
      // Only allow numbers for date input
      const numericValue = value.toString().replace(/\D/g, '')
      console.log('Due date changed:', numericValue)
      setFormData(prev => ({
        ...prev,
        [field]: numericValue
      }))
      return
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Helper function to format YYYYMMDD to display format (DD/M/YYYY 23:00)
  const formatDateForDisplay = (yyyymmdd: string) => {
    if (!yyyymmdd || yyyymmdd.length !== 8) return ""
    const year = yyyymmdd.substring(0, 4)
    const month = parseInt(yyyymmdd.substring(4, 6))
    const day = parseInt(yyyymmdd.substring(6, 8))
    return `${day}/${month}/${year} 23:00`
  }

  // Helper function to validate YYYYMMDD format
  const isValidDateFormat = (dateStr: string) => {
    if (!/^\d{8}$/.test(dateStr)) return false
    const year = parseInt(dateStr.substring(0, 4))
    const month = parseInt(dateStr.substring(4, 6))
    const day = parseInt(dateStr.substring(6, 8))
    
    if (year < 2020 || year > 2030) return false
    if (month < 1 || month > 12) return false
    if (day < 1 || day > 31) return false
    
    // Check if date is valid
    const date = new Date(year, month - 1, day)
    return date.getFullYear() === year && 
           date.getMonth() === month - 1 && 
           date.getDate() === day
  }

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item: string, i: number) => 
        i === index ? value : item
      )
    }))
  }

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), ""]
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_: string, i: number) => i !== index)
    }))
  }

      const handleSave = async () => {
      // Validate required fields
      console.log(formData)
      if (!formData.title || !formData.subtitle || !formData.description || !formData.subject || !formData.dueDate) {
        alert("Please fill in all required fields")
        return
      }

      // Validate date format
      if (!isValidDateFormat(formData.dueDate)) {
        alert("Please enter a valid date in YYYYMMDD format (e.g., 20250825)")
        return
      }

    // Filter out empty strings from arrays
    const cleanedData = {
      ...formData,
      objectives: formData.objectives.filter(obj => obj.trim() !== ""),
      materials: formData.materials.filter(mat => mat.trim() !== ""),
      instructions: formData.instructions.filter(inst => inst.trim() !== "")
    }

    setSaving(true)

    try {
      // Get existing assignments from localStorage
      const existingAssignmentsEn = JSON.parse(localStorage.getItem('custom_assignments_en') || '[]')
      const existingAssignmentsZh = JSON.parse(localStorage.getItem('custom_assignments_zh') || '[]')

      // Generate new ID
      const newId = Math.max(
        ...existingAssignmentsEn.map((a: any) => a.id || 0),
        ...existingAssignmentsZh.map((a: any) => a.id || 0),
        1000 // Start custom IDs from 1000 to avoid conflicts
      ) + 1

      // Create assignment object in English format
      const newAssignmentEn = {
        id: newId,
        title: cleanedData.title,
        subtitle: cleanedData.subtitle,
        description: cleanedData.description,
        subject: cleanedData.subject,
        dueDate: formatDateForDisplay(cleanedData.dueDate),
        estimatedTime: cleanedData.estimatedTime,
        difficulty: cleanedData.difficulty,
        objectives: cleanedData.objectives,
        materials: cleanedData.materials,
        instructions: cleanedData.instructions,
        completed: false,
        buttonText: cleanedData.buttonText,
        pointReward: cleanedData.pointReward,
        iconName: cleanedData.icon
      }

      // Subject mapping for Chinese
      const subjectMapping: { [key: string]: string } = {
        'Alphabet': '字母',
        'Sight Words': '常見詞',
        'Vocabulary': '詞彙',
        'Phonemic Awareness': '語音意識',
        'Point-and-Read': '指讀'
      }

      // Create corresponding Chinese version
      const newAssignmentZh = {
        ...newAssignmentEn,
        title: `${cleanedData.title} (中文版)`,
        subtitle: `${cleanedData.subtitle} (中文版)`,
        description: `${cleanedData.description} (中文版)`,
        subject: subjectMapping[cleanedData.subject] || cleanedData.subject
      }

      // Save to localStorage
      localStorage.setItem('custom_assignments_en', JSON.stringify([...existingAssignmentsEn, newAssignmentEn]))
      localStorage.setItem('custom_assignments_zh', JSON.stringify([...existingAssignmentsZh, newAssignmentZh]))

      // Also add to weekly tasks
      const existingTasksEn = JSON.parse(localStorage.getItem('custom_weekly_tasks_en') || '[]')
      const existingTasksZh = JSON.parse(localStorage.getItem('custom_weekly_tasks_zh') || '[]')

      const newTaskEn = {
        id: newId,
        title: cleanedData.title,
        subtitle: cleanedData.subtitle,
        completed: false,
        isPrimary: false,
        icon: iconMap[cleanedData.icon as keyof typeof iconMap],
        subject: cleanedData.subject,
        pointReward: cleanedData.pointReward
      }

      const newTaskZh = {
        ...newTaskEn,
        title: `${cleanedData.title} (中文版)`,
        subtitle: `${cleanedData.subtitle} (中文版)`,
        subject: subjectMapping[cleanedData.subject] || cleanedData.subject
      }

      localStorage.setItem('custom_weekly_tasks_en', JSON.stringify([...existingTasksEn, newTaskEn]))
      localStorage.setItem('custom_weekly_tasks_zh', JSON.stringify([...existingTasksZh, newTaskZh]))

      setSaved(true)
      setTimeout(() => {
        router.push('/admin/assignment')
      }, 1500)

    } catch (error) {
      console.error('Error saving assignment:', error)
      alert('Error saving assignment. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const renderArrayField = (
    title: string,
    field: string,
    placeholder: string,
    icon: React.ComponentType<any>
  ) => {
    const Icon = icon
    const items = formData[field as keyof typeof formData] as string[]
    
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon className="w-4 h-4 text-gray-600" />
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`${placeholder} ${index + 1}`}
                  value={item}
                  onChange={(e) => handleArrayChange(field, index, e.target.value)}
                  className="flex-1"
                />
                {items.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem(field, index)}
                    className="px-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem(field)}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {title.slice(0, -1)}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/assignment">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Assignment</h1>
            <p className="text-gray-600 mt-1 text-sm">Create assignments for the dashboard</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <Input
                    placeholder="e.g., Week 13 - Reading Comprehension"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle *
                  </label>
                  <Input
                    placeholder="e.g., Complete worksheet and upload photo"
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <Textarea
                    placeholder="Detailed description of the assignment..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alphabet">Alphabet</SelectItem>
                        <SelectItem value="Sight Words">Sight Words</SelectItem>
                        <SelectItem value="Vocabulary">Vocabulary</SelectItem>
                        <SelectItem value="Phonemic Awareness">Phonemic Awareness</SelectItem>
                        <SelectItem value="Point-and-Read">Point-and-Read</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Point Reward
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      value={formData.pointReward}
                      onChange={(e) => handleInputChange('pointReward', parseInt(e.target.value) || 10)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assignment Details */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Assignment Details</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date *
                    </label>
                    <Input
                      type="text"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      placeholder="YYYYMMDD (e.g., 20250825)"
                      maxLength={8}
                      pattern="\d{8}"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter date in YYYYMMDD format (e.g., 20250825 for Aug 25, 2025)
                    </p>
                    {formData.dueDate && (
                      <div className="mt-1">
                        {isValidDateFormat(formData.dueDate) ? (
                          <p className="text-xs text-green-600">
                            ✓ Will be saved as: {formatDateForDisplay(formData.dueDate)}
                          </p>
                        ) : (
                          <p className="text-xs text-red-600">
                            ✗ Invalid date format. Use YYYYMMDD (8 digits)
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Time
                    </label>
                    <Input
                      placeholder="e.g., 15-20 minutes"
                      value={formData.estimatedTime}
                      onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <Select value={formData.difficulty} onValueChange={(value: "Easy" | "Medium" | "Hard") => handleInputChange('difficulty', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button Text
                    </label>
                    <Input
                      placeholder="e.g., Upload Worksheet, Watch Video"
                      value={formData.buttonText}
                      onChange={(e) => handleInputChange('buttonText', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
                    <Select value={formData.icon} onValueChange={(value) => handleInputChange('icon', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Camera">Camera (Upload)</SelectItem>
                        <SelectItem value="Play">Play (Video)</SelectItem>
                        <SelectItem value="Users">Users (Group Activity)</SelectItem>
                        <SelectItem value="CheckCircle2">Check Circle (Complete)</SelectItem>
                        <SelectItem value="BookOpen">Book (Reading)</SelectItem>
                        <SelectItem value="User">User (Individual)</SelectItem>
                        <SelectItem value="Target">Target (Goal)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          {renderArrayField("Learning Objectives", "objectives", "Enter objective", Target)}

          {/* Materials Needed */}
          {renderArrayField("Materials Needed", "materials", "Enter material", BookOpen)}

          {/* Instructions */}
          {renderArrayField("Instructions", "instructions", "Enter instruction step", User)}

          {/* Save Button */}
          <div className="flex gap-4 pt-6">
            <Link href="/admin/assignment" className="flex-1">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button
              onClick={handleSave}
              disabled={saving || !formData.title || !formData.subtitle || !formData.description || !formData.subject || !formData.dueDate || !isValidDateFormat(formData.dueDate)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              {saving ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Assignment
                </>
              )}
            </Button>
          </div>

          {saved && (
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-600 font-medium">
                Assignment created successfully! Redirecting to assignment list...
              </p>
            </div>
          )}
        </div>

        {/* Bottom padding for mobile navigation */}
        <div className="h-24"></div>
      </div>
    </div>
  )
}
