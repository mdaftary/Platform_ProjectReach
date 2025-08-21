import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Download, Upload, Clock, FileText, Video, ImageIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AssignmentDetailPage({ params }: { params: { id: string } }) {
  // Mock data - in real app, fetch based on params.id
  const assignment = {
    id: params.id,
    title: "English Reading Comprehension",
    subject: "English",
    description: "Read the story 'The Little Red Hen' and answer the comprehension questions.",
    fullInstructions: `
      1. Download and read the story "The Little Red Hen" carefully
      2. Answer all 5 comprehension questions in complete sentences
      3. Take a photo or video of your child reading the story aloud
      4. Submit your answers and recording by the due date
      
      Learning Objectives:
      • Improve reading fluency and comprehension
      • Practice answering questions in complete sentences
      • Build confidence in oral reading
    `,
    dueDate: "2025-08-23",
    status: "pending",
    difficulty: "Easy",
    estimatedTime: "30 mins",
    teacher: "Ms. Wong",
    materials: [
      { name: "The Little Red Hen Story.pdf", type: "pdf", size: "2.3 MB" },
      { name: "Comprehension Questions.pdf", type: "pdf", size: "1.1 MB" },
      { name: "Reading Guide for Parents.pdf", type: "pdf", size: "800 KB" },
    ],
    submissionTypes: ["photo", "video", "pdf"],
    maxPoints: 20,
    hasSubmission: false,
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-4 h-4 text-red-500" />
      case "video":
        return <Video className="w-4 h-4 text-blue-500" />
      case "image":
        return <ImageIcon className="w-4 h-4 text-green-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/assignments" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Assignment Details</h1>
                <p className="text-sm text-muted-foreground">REACH Hong Kong</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Emma Chen - K3
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assignment Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{assignment.subject}</Badge>
                      <Badge variant="outline">{assignment.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-2xl">{assignment.title}</CardTitle>
                    <CardDescription className="text-base">{assignment.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-bold text-lg text-foreground">
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                    {assignment.fullInstructions}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Materials to Download */}
            <Card>
              <CardHeader>
                <CardTitle>Assignment Materials</CardTitle>
                <CardDescription>Download these files to complete the assignment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {assignment.materials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(material.type)}
                      <div>
                        <p className="font-medium text-foreground">{material.name}</p>
                        <p className="text-sm text-muted-foreground">{material.size}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignment Info */}
            <Card>
              <CardHeader>
                <CardTitle>Assignment Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Teacher</p>
                    <p className="font-medium text-foreground">{assignment.teacher}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Points</p>
                    <p className="font-medium text-foreground">{assignment.maxPoints} pts</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Est. Time</p>
                    <p className="font-medium text-foreground">{assignment.estimatedTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant="outline" className="text-xs">
                      {assignment.status}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Accepted Formats</p>
                  <div className="flex flex-wrap gap-1">
                    {assignment.submissionTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submission Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Work</CardTitle>
                <CardDescription>Upload photos, videos, or documents of your completed assignment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {!assignment.hasSubmission ? (
                  <>
                    <Button className="w-full bg-primary hover:bg-primary/90" size="lg" asChild>
                      <Link href={`/assignments/${assignment.id}/submit`}>
                        <Upload className="w-4 h-4 mr-2" />
                        Submit Assignment
                      </Link>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Due in{" "}
                      {Math.ceil(
                        (new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      )}{" "}
                      days
                    </p>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      View Submission
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Edit Submission
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Clock className="w-4 h-4 mr-2" />
                  Ask in Discussion Forum
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Parent Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
