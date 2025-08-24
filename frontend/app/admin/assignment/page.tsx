"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Users, Edit, Trash2, Camera, Play, CheckCircle2, BookOpen, User, Target } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

// Icon mapping for assignments
const iconMap = {
  Camera,
  Play,
  Users,
  CheckCircle2,
  BookOpen,
  User,
  Target
}

// Hardcoded assignments for reference (these are the template assignments)
const hardcodedAssignmentsEn = [
  {
    id: 1,
    title: "Week 12 - Alphabet Practice",
    subtitle: "Upload Worksheet",
    description: "Complete the alphabet recognition worksheet by identifying and circling the correct letters.",
    subject: "Alphabet",
    dueDate: "25/8/2025 23:00",
    difficulty: "Easy",
    buttonText: "Upload Worksheet",
    pointReward: 10,
    type: "Template"
  },
  {
    id: 2,
    title: "Letter Recognition Tips",
    subtitle: "Watch Tutorial Video", 
    description: "Watch an educational video about effective letter recognition strategies.",
    subject: "Alphabet",
    dueDate: "26/8/2025 23:00",
    difficulty: "Easy",
    buttonText: "Watch Tutorial Video",
    pointReward: 10,
    type: "Template"
  },
  {
    id: 3,
    title: "Alphabet practice tutoring",
    subtitle: "Live tutoring at 25/8/2025 21:00",
    description: "Our volunteer tutors will be available to help you with your homework assignments.",
    subject: "Alphabet", 
    dueDate: "26/8/2025 23:00",
    difficulty: "Easy",
    buttonText: "I am interested, remind me",
    pointReward: 10,
    type: "Template"
  }
]

const hardcodedAssignmentsZh = [
	{
		id: 1,
    title: "第12周 - 字母練習",
    subtitle: "上傳功課",
    description: "通過識別和圈出正確的字母來完成字母識別練習單。",
    subject: "字母",
    dueDate: "25/8/2025 23:00", 
    difficulty: "Easy",
    buttonText: "上傳功課",
    pointReward: 10,
    type: "Template"
	},
	{
		id: 2,
    title: "字母識別技巧",
    subtitle: "觀看教學視頻",
    description: "觀看關於有效字母識別策略的教育視頻。",
    subject: "字母",
    dueDate: "26/8/2025 23:00",
    difficulty: "Easy", 
    buttonText: "觀看教學視頻",
    pointReward: 10,
    type: "Template"
  },
  {
    id: 3,
    title: "字母練習輔導",
    subtitle: "25/8/2025 21:00實時輔導",
    description: "我們的義工導師將協助您完成功課作業。",
    subject: "字母",
    dueDate: "26/8/2025 23:00",
    difficulty: "Easy",
    buttonText: "我有興趣，請提醒我", 
    pointReward: 10,
    type: "Template"
  }
]

export default function AdminAssignmentManagementPage() {
	const { t, i18n } = useTranslation()
	const [customAssignments, setCustomAssignments] = useState<any[]>([])
	const [language, setLanguage] = useState<'en' | 'zh'>('en')
	const [filterType, setFilterType] = useState<'all' | 'template' | 'custom'>('all')

	// Load assignments from localStorage
	useEffect(() => {
		const loadAssignments = () => {
			try {
				const customAssignmentsEn = JSON.parse(localStorage.getItem('custom_assignments_en') || '[]')
				const customAssignmentsZh = JSON.parse(localStorage.getItem('custom_assignments_zh') || '[]')
				
				// Convert iconName back to icon component for custom assignments
				const processAssignments = (assignments: any[]) => assignments.map((assignment: any) => ({
					...assignment,
					icon: assignment.iconName ? iconMap[assignment.iconName as keyof typeof iconMap] : Camera,
					type: 'Custom'
				}))

				const processedEn = processAssignments(customAssignmentsEn)
				const processedZh = processAssignments(customAssignmentsZh)

				// Combine with hardcoded assignments
				const allAssignments = language === 'zh' 
					? [...hardcodedAssignmentsZh, ...processedZh]
					: [...hardcodedAssignmentsEn, ...processedEn]

				setCustomAssignments(allAssignments)
			} catch (error) {
				console.error('Error loading assignments:', error)
			}
		}

		loadAssignments()

		// Reload when window gains focus (returning from create page)
		const handleFocus = () => loadAssignments()
		window.addEventListener('focus', handleFocus)
		
		return () => window.removeEventListener('focus', handleFocus)
	}, [language])

	// Filter assignments based on type
	const filteredAssignments = customAssignments.filter(assignment => {
		if (filterType === 'all') return true
		if (filterType === 'template') return assignment.type === 'Template'
		if (filterType === 'custom') return assignment.type === 'Custom'
		return true
	})

	// Delete custom assignment
	const handleDeleteAssignment = (id: number) => {
		if (confirm(t('admin.assignments.deleteConfirm'))) {
			const key = language === 'zh' ? 'custom_assignments_zh' : 'custom_assignments_en'
			const stored = JSON.parse(localStorage.getItem(key) || '[]')
			const filtered = stored.filter((assignment: any) => assignment.id !== id)
			localStorage.setItem(key, JSON.stringify(filtered))
			
			// Also remove from weekly tasks
			const taskKey = language === 'zh' ? 'custom_weekly_tasks_zh' : 'custom_weekly_tasks_en'
			const storedTasks = JSON.parse(localStorage.getItem(taskKey) || '[]')
			const filteredTasks = storedTasks.filter((task: any) => task.id !== id)
			localStorage.setItem(taskKey, JSON.stringify(filteredTasks))
			
			// Reload assignments
			const event = new Event('focus')
			window.dispatchEvent(event)
		}
	}

	// Get difficulty color
	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case 'Easy': return 'bg-green-100 text-green-700'
			case 'Medium': return 'bg-yellow-100 text-yellow-700'
			case 'Hard': return 'bg-red-100 text-red-700'
			default: return 'bg-gray-100 text-gray-700'
		}
	}

	// Get subject color
	const getSubjectColor = (subject: string) => {
		switch (subject.toLowerCase()) {
			case 'alphabet': case '字母': return 'bg-orange-500'
			case 'sight words': case '常見詞': return 'bg-blue-500'
			case 'vocabulary': case '詞彙': return 'bg-purple-500'
			case 'phonemic awareness': case '語音意識': return 'bg-green-500'
			case 'point-and-read': case '指讀': return 'bg-red-500'
			default: return 'bg-gray-500'
		}
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-md mx-auto px-6 py-8 space-y-6">
				{/* Header with Create Assignment Button */}
				<div className="bg-white rounded-xl shadow-sm p-6">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">{t('admin.assignments.title')}</h1>
					<Link href="/admin/assignment/create" className="block">
						<Button className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-base">
							<Plus className="w-5 h-5 mr-2" />
							{t('admin.assignments.createNew')}
						</Button>
					</Link>
				</div>


				{/* Assignment List */}
				<div className="space-y-4">
					{filteredAssignments.map((assignment) => {
						const IconComponent = assignment.icon || Camera
						return (
							<Card key={assignment.id} className="bg-white border border-gray-200 shadow-sm">
								<CardContent className="p-4 space-y-3">
									{/* Header */}
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											{/* Subject indicator */}
											<div className={`w-3 h-8 ${getSubjectColor(assignment.subject)} rounded-full flex-shrink-0`}></div>
											
											{/* Icon */}
											<div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
												<IconComponent className="w-4 h-4 text-gray-600" />
											</div>
										</div>

										{/* Type badge and actions */}
										<div className="flex items-center gap-2">
											<Badge 
												variant="outline" 
												className={`text-xs ${assignment.type === 'Custom' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-600'}`}
											>
												{assignment.type === 'Custom' ? t('admin.assignments.custom') : t('admin.assignments.template')}
											</Badge>
											{assignment.type === 'Custom' && (
					<Button
													variant="ghost"
													size="sm"
													onClick={() => handleDeleteAssignment(assignment.id)}
													className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
												>
													<Trash2 className="w-4 h-4" />
					</Button>
											)}
						</div>
			</div>

									{/* Assignment Info */}
									<div>
										<h3 className="font-semibold text-gray-900 text-base mb-1">
											{assignment.title}
										</h3>
										<p className="text-sm text-gray-600 mb-2">
											{assignment.subtitle}
										</p>
										<p className="text-sm text-gray-700 leading-relaxed">
											{assignment.description}
										</p>
				</div>

																		{/* Details */}
									<div className="grid grid-cols-2 gap-4 text-sm">
										<div>
											<span className="text-gray-500">{t('admin.assignments.subject')}</span>
											<div className="font-medium text-gray-900">{assignment.subject}</div>
										</div>
										<div>
											<span className="text-gray-500">{t('admin.assignments.difficulty')}</span>
											<Badge className={`text-xs ml-1 ${getDifficultyColor(assignment.difficulty)}`}>
												{assignment.difficulty}
											</Badge>
										</div>
									</div>

																		{/* Due Date & Points */}
									<div className="flex items-center justify-between pt-2 border-t border-gray-100">
										<div className="flex items-center gap-2 text-sm text-gray-500">
											<Calendar className="w-4 h-4" />
											<span>{t('admin.assignments.due')} {assignment.dueDate}</span>
										</div>
										<div className="text-sm font-medium text-gray-900">
											{assignment.pointReward} {t('admin.assignments.points')}
										</div>
									</div>

																		{/* Button Text */}
									{assignment.buttonText && (
										<div className="pt-2">
											<div className="bg-gray-50 rounded-lg p-2">
												<span className="text-xs text-gray-500">{t('admin.assignments.action')}</span>
												<div className="text-sm font-medium text-gray-700 mt-1">
													{assignment.buttonText}
												</div>
											</div>
										</div>
									)}
							</CardContent>
						</Card>
						)
					})}

					{filteredAssignments.length === 0 && (
						<div className="text-center text-gray-500 py-12">
							<div className="text-lg font-medium mb-2">{t('admin.assignments.noAssignments')}</div>
							<div className="text-sm">
								{filterType === 'custom' 
									? t('admin.assignments.noCustomAssignments')
									: t('admin.assignments.tryFilters')
								}
							</div>
						</div>
					)}
				</div>
			</div>
			
			{/* Bottom padding for mobile navigation */}
			<div className="h-24"></div>
		</div>
	)
}