"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { saveSession, type TutoringSession } from "@/lib/session-storage"

interface CreateSessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSessionCreated: (session: TutoringSession) => void
}

interface FormData {
  title: string
  subject: string
  scheduledDate: string
  scheduledTime: string
  duration: string
  description: string
}

interface FormErrors {
  title?: string
  subject?: string
  scheduledDate?: string
  scheduledTime?: string
  duration?: string
  description?: string
}

export function CreateSessionDialog({ open, onOpenChange, onSessionCreated }: CreateSessionDialogProps) {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    subject: '',
    scheduledDate: '',
    scheduledTime: '',
    duration: '',
    description: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = t('volunteer.liveTutoring.createSession.validation.titleRequired')
    }
    if (!formData.subject) {
      newErrors.subject = t('volunteer.liveTutoring.createSession.validation.subjectRequired')
    }
    if (!formData.scheduledDate) {
      newErrors.scheduledDate = t('volunteer.liveTutoring.createSession.validation.dateRequired')
    }
    if (!formData.scheduledTime) {
      newErrors.scheduledTime = t('volunteer.liveTutoring.createSession.validation.timeRequired')
    }
    if (!formData.duration) {
      newErrors.duration = t('volunteer.liveTutoring.createSession.validation.durationRequired')
    } else if (isNaN(Number(formData.duration)) || Number(formData.duration) <= 0) {
      newErrors.duration = t('volunteer.liveTutoring.createSession.validation.durationInvalid')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Combine date and time into ISO string
      const scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`)
      
      const sessionData = {
        title: formData.title.trim(),
        subject: formData.subject,
        scheduledTime: scheduledDateTime.toISOString(),
        duration: Number(formData.duration),
        status: 'upcoming' as const,
        description: formData.description.trim()
      }

      const newSession = saveSession(sessionData)
      onSessionCreated(newSession)
      
      // Reset form
      setFormData({
        title: '',
        subject: '',
        scheduledDate: '',
        scheduledTime: '',
        duration: '',
        description: ''
      })
      setErrors({})
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error creating session:', error)
      // You could add toast notification here
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const subjects = [
    { value: 'alphabet', label: t('volunteer.liveTutoring.createSession.subjects.alphabet') },
    { value: 'sightwords', label: t('volunteer.liveTutoring.createSession.subjects.sightwords') },
    { value: 'vocabulary', label: t('volunteer.liveTutoring.createSession.subjects.vocabulary') },
    { value: 'phonemicAwareness', label: t('volunteer.liveTutoring.createSession.subjects.phonemicAwareness') },
    { value: 'pointAndRead', label: t('volunteer.liveTutoring.createSession.subjects.pointAndRead') }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('volunteer.liveTutoring.createSession.title')}</DialogTitle>
          <DialogDescription>
            {t('volunteer.liveTutoring.createSession.description')}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Session Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{t('volunteer.liveTutoring.createSession.form.sessionTitle')}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={t('volunteer.liveTutoring.createSession.form.sessionTitlePlaceholder')}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Learning Area */}
          <div className="space-y-2">
            <Label htmlFor="subject">{t('volunteer.liveTutoring.createSession.form.subject')}</Label>
            <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
              <SelectTrigger className={errors.subject ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('volunteer.liveTutoring.createSession.form.subjectPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">{t('volunteer.liveTutoring.createSession.form.scheduledDate')}</Label>
              <Input
                id="date"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                className={errors.scheduledDate ? 'border-red-500' : ''}
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
              />
              {errors.scheduledDate && <p className="text-sm text-red-500">{errors.scheduledDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">{t('volunteer.liveTutoring.createSession.form.scheduledTime')}</Label>
              <Input
                id="time"
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                className={errors.scheduledTime ? 'border-red-500' : ''}
              />
              {errors.scheduledTime && <p className="text-sm text-red-500">{errors.scheduledTime}</p>}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">{t('volunteer.liveTutoring.createSession.form.duration')}</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="180"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              placeholder={t('volunteer.liveTutoring.createSession.form.durationPlaceholder')}
              className={errors.duration ? 'border-red-500' : ''}
            />
            {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">{t('volunteer.liveTutoring.createSession.form.description')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={t('volunteer.liveTutoring.createSession.form.descriptionPlaceholder')}
              className="min-h-[80px]"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {t('volunteer.liveTutoring.createSession.buttons.cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting} className="duolingo-gradient-primary">
              {isSubmitting 
                ? t('volunteer.liveTutoring.createSession.buttons.creating')
                : t('volunteer.liveTutoring.createSession.buttons.createSession')
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
