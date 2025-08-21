import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Download, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Assignment {
  id: string
  title: string
  subject: string
  description: string
  dueDate: string
  status: "pending" | "submitted" | "graded" | "overdue"
  difficulty: string
  estimatedTime: string
  hasSubmission: boolean
  grade?: string
  feedback?: string
}

interface AssignmentCardProps {
  assignment: Assignment
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
      case "graded":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string, dueDate: string) => {
    const isOverdue = new Date(dueDate) < new Date() && status === "pending"

    if (isOverdue) {
      return (
        <Badge variant="destructive" className="text-xs">
          Overdue
        </Badge>
      )
    }

    switch (status) {
      case "submitted":
        return (
          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
            Submitted
          </Badge>
        )
      case "graded":
        return (
          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
            Graded
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-xs">
            Pending
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(assignment.status)}
            <Badge variant="outline" className="text-xs">
              {assignment.subject}
            </Badge>
          </div>
          {getStatusBadge(assignment.status, assignment.dueDate)}
        </div>
        <CardTitle className="text-lg leading-tight">{assignment.title}</CardTitle>
        <CardDescription className="text-sm">{assignment.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Assignment Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Due Date</p>
            <p className="font-medium text-foreground">{new Date(assignment.dueDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Est. Time</p>
            <p className="font-medium text-foreground">{assignment.estimatedTime}</p>
          </div>
        </div>

        {/* Grade Display (if submitted) */}
        {assignment.hasSubmission && assignment.grade && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-green-800">Grade</span>
              <span className="text-lg font-bold text-green-600">{assignment.grade}</span>
            </div>
            {assignment.feedback && <p className="text-xs text-green-700">{assignment.feedback}</p>}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" asChild>
              <Link href={`/assignments/${assignment.id}`}>
                <Download className="w-4 h-4 mr-1" />
                View Details
              </Link>
            </Button>

            {!assignment.hasSubmission ? (
              <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href={`/assignments/${assignment.id}/submit`}>
                  <Upload className="w-4 h-4 mr-1" />
                  Submit Work
                </Link>
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href={`/assignments/${assignment.id}/submission`}>View Submission</Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
