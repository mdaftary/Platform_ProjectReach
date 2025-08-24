"use client"

import { ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"

interface PreviousAssignmentCardProps {
  title: string
  subtitle: string
  subject: string
  submittedDate?: string
  subjectColor: string
  rightContent?: React.ReactNode
  onClick?: () => void
  children?: React.ReactNode
}

export function PreviousAssignmentCard({
  title,
  subtitle,
  subject,
  submittedDate,
  subjectColor,
  rightContent,
  onClick,
  children
}: PreviousAssignmentCardProps) {
  const { t } = useTranslation()

  return (
    <div
      className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-sm transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        {/* Left side: Assignment info */}
        <div className="flex items-center gap-3 flex-1">
          {/* Subject indicator */}
          <div className={`w-3 h-12 ${subjectColor} rounded-full flex-shrink-0`}></div>

          {/* Assignment details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm truncate">
              {title}
            </h3>
            <p className="text-gray-500 text-xs truncate">
              {subtitle}
            </p>
            {submittedDate && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">
                  {t('assignments.previousAssignments.submitted')}: {submittedDate}
                </span>
                <span className="text-xs text-gray-300">•</span>
                <span className="text-xs text-gray-500">
                  {subject}
                </span>
              </div>
            )}

            {/* Additional content */}
            {children}
          </div>
        </div>

        {/* Right side: Custom content (score, points, etc.) */}
        {rightContent && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {rightContent}
          </div>
        )}

        {/* Arrow */}
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  )
}